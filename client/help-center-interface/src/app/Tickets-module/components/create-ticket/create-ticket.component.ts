import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Ticket } from './../../classes/ticket'
import { Form } from '../../classes/form';

// import { DynamicRequestFormComponent } from './../../modules/request-form/components/dynamic-request-form/dynamic-request-form.component';
import { FormService } from './../../services/ticket-forms-service/form.service';
import { FieldService } from './../../services/ticket-fields-service/field.service';
import { Field_value } from '../../classes/field_value';
import { UserService } from './../../../Helpcenter-module/services/user-service/user.service';
import { Custom_field_value } from '../../classes/custom_field_value';
import { TicketService } from '../../services/ticket-service/ticket.service';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  public form$: Observable<any>;
  public ticket_form: Form;                         //current request form object      
  public ticket_form_fields: Field_value[];         //ticket request fields and values for current form
  public user_current_orgid : number;               // current user organization id
  public ticket_object: Ticket;                     // object saved to ticket table
  public ticket_custom_fields: Custom_field_value[];   //array of values of custom fields data
  public requester_id: number;
  public dynamic_form;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ticketService: TicketService,
              private userService: UserService,
              private ticketFormService: FormService,
              private ticketFieldService: FieldService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.get_request_form_data();
    this.requester_id = this.userService.getUserId();
}

  /**
   * Gets current logged in users organization and associated products object
   */
  public getUserOrgProducts() {
    const orgs = this.userService.getOrganizationIds();
    this.userService.getOrgProducts(orgs).subscribe((data) => {
      console.log(data)
      this.user_current_orgid = data.filter(val => val.product_ids == this.ticket_form.product_id).map(val => val.organization_ids)[0];
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Gets current selected form data to create ticket form template
   */
  public get_request_form_data() {
    this.form$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.ticketFormService.getForm(params.get('id'))));
    this.form$.subscribe((formData) => {
      this.ticket_form = formData;
      this.getFieldValueData();
      this.getUserOrgProducts();

    }, (error) => {
      console.log(error);
    });
  }


  /**
   * Function gets field_value service to get field data 
   */
  public getFieldValueData() {
    this.ticketFieldService.getFieldsByIds(this.ticket_form.ticket_field_ids)
      .subscribe((data) => {
        this.ticket_form_fields = data;
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * Method creates a ticket object to be saved to the database from the input gained of the dynamic request form
   * @param $event : event data emmited from the ticket request form 
   */
  createTicketRequest($event){
    this.ticket_object = {
      email_cc_ids: $event.email_cc_ids,
      organization_id: this.user_current_orgid,
      description: $event.request_body.description,
      priority: $event.request_body.priority,
      subject: $event.request_body.subject,
      requester_id: this.requester_id,
      ticket_form_id: this.ticket_form.id,
      product_id: this.ticket_form.product_id,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }

    
    Object.keys($event.request_body).forEach(key => {
      if(['subject', 'description', 'priority'].indexOf(key) == -1){
        this.ticket_custom_fields.push({field_key: key,
                                      field_value: $event.request_body[key]})
      }


    });


    
    console.log(this.ticket_object)
    console.log(this.ticket_custom_fields)
    this.submitTicket()
  }

  /**
   *  method saves the ticket to the database
   */
  submitTicket(){
    if(this.ticket_custom_fields == null){
      console.log(true)
    }
    else{
      console.log(false)
    }

    this.ticketService.createTicket(this.ticket_object)
                      .subscribe((data) => {
                        console.log(data)
                      }, (error) => {
                        console.log(error)
                      })


    
  }
}
