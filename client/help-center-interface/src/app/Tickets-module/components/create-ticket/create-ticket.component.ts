import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import { Ticket } from './../../classes/ticket'
import { Form } from '../../classes/form';
import { Field } from '../../classes/field';
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
  public ticket_object: Ticket;

  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private router: Router,
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

  get request_header() { return this.ticket_request_form.get('header');}
  get request_body() { return this.ticket_request_form.get('body');}
  get request_footer() { return this.ticket_request_form.get('footer');}
  get get_emails() { return this.ticket_request_form.get('header').get('cc_email');}
  
  

  ngOnInit() {
    this.form$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.ticketFormService.getForm(params.get('id')))
    )

    this.form$.subscribe((formData) => {
      this.ticket_form = formData
      this.getFieldValueData();
    }, (error) => {
      console.log(error);
    })
  }

  /**
   * Function gets field_value service to get field data 
   */
  public getFieldValueData() {
    this.ticketFieldService.getFieldsByIds(this.ticket_form.ticket_field_ids)
      .subscribe((data) => {
        this.ticket_form_fields = data;
        this.create_ticket_request_form(<FormGroup> this.request_body)
        this.create_request_form_template()
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


  add(event: MatChipInputEvent): void {
    console.log(event)
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  submitTicket(){
    console.log(this.ticket_request_form)
    this.ticket_object = {
      requester_id: this.userService.getUserId(),
      email_cc_ids: this.get_emails.value,
      description: this.request_body.value.description.value,
      priority: this.request_body.value.priority.value,
      organization_id: 11

    }
  }
}
