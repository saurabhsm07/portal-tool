import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import { Ticket } from './../../classes/ticket'
import { Form } from '../../classes/form';
import { Field } from '../../classes/field';

// import { DynamicRequestFormComponent } from './../../modules/request-form/components/dynamic-request-form/dynamic-request-form.component';
import { FormService } from './../../services/ticket-forms-service/form.service';
import { FieldService } from './../../services/ticket-fields-service/field.service';
import { Field_value } from '../../classes/field_value';
import { RequestFieldCreators } from './../../../imports/request-field-component-creators';
import { UserService } from './../../../Helpcenter-module/services/user-service/user.service';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  public form$: Observable<any>;
  public ticket_form: Form;                       //current request form object      
  public ticket_form_fields: Field_value[];      //ticket request fields and values for current form
  public request_form_template = '';             //html form template generated from request form fields
  public emails : string[] = [];                 // email field used in form field material chip element
  public user_current_orgid : number 
  public ticket_object: Ticket;
  
  public dynamic_form;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private ticketFormService: FormService,
              private ticketFieldService: FieldService,
              private fb : FormBuilder) { }
  

  public ticket_request_form = this.fb.group({
    header: this.fb.group({
      cc_emails: [[]]
    }),
    body: this.fb.group({
      
    }),
    footer: this.fb.group({
      file_attachments: []
    })
  })

 

  ngOnInit() {
    this.get_request_form_data();
    
}

  /**
   * Gets current logged in users organization and associated products object
   */
  public getUserOrgProducts() {
    const orgs = this.userService.getOrganizationIds();
    this.userService.getOrgProducts(orgs).subscribe((data) => {
      this.user_current_orgid = data.filter(val => val.product_id == this.ticket_form.product_id).map(val => val.organization_id)[0];
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

  // public createDynamicFormComponent(){
  //   const factory = this.resolver.resolveComponentFactory<any>(DynamicRequestFormComponent);
  //   this.dynamic_form = this.container.createComponent(factory);
  //   this.dynamic_form.instance.request_form_config = this.ticket_form_fields
  // }

  /**
   * Function gets field_value service to get field data 
   */
  public getFieldValueData() {
    this.ticketFieldService.getFieldsByIds(this.ticket_form.ticket_field_ids)
      .subscribe((data) => {
        this.ticket_form_fields = data;
        // this.create_ticket_request_form(<FormGroup> this.request_body)
        this.create_request_form_template()
        // this.createDynamicFormComponent()
      }, (error) => {
        console.log(error);
      });
  }


  /**
   * Method to create request form body from the ticket request fields of the current form object
   */
  public create_ticket_request_form(request_body: FormGroup){
    this.ticket_form_fields.forEach(field => {
      request_body.addControl(field.name, this.fb.control([]))
    })
    console.log(this.ticket_request_form.controls)
  }

  /**
   * Method to create ticket request form template from request fields list
   */
  public create_request_form_template(){
   this.request_form_template = RequestFieldCreators.createFieldComponent(this.ticket_form_fields)
  }


 

  /**
   *  create a ticket object from the form data on form submit
   */
  submitTicket(){
    console.log(this.ticket_request_form.controls)
    // this.ticket_object = {
    //   requester_id: this.userService.getUserId(),
    //   email_cc_ids: this.get_emails.value,
    //   description: this.request_body.value,
    //   priority: this.request_body.value.priority.value,
    //   organization_id: this.user_current_orgid

    // }
    // console.log(this.ticket_object);
  }
}
