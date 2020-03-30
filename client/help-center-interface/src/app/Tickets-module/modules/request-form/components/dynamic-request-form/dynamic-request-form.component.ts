import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Field_value } from './../../../../classes/field_value';
import { RequestFieldCreators } from '../../../../../imports/request-field-component-creators';
import { Ticket } from '../../../../classes/ticket';


@Component({
  selector: 'app-dynamic-request-form',
  templateUrl: './dynamic-request-form.component.html',
  styleUrls: ['./dynamic-request-form.component.scss']
})
export class DynamicRequestFormComponent implements OnInit {
  
  @Input()
  public request_form_config : Field_value[] = [];     // request form config array recieved from create ticket component
  public request_form_object : FormGroup;              // reactive form object for the create ticket request built using request field value array
  public request_form_template : string;               // request form template html string built using request field value array
  public ticket_request : Ticket                      // request object to be returned to the parent create ticket component
  public emails : string[] = [];                 // email field used in form field material chip element
  

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.request_form_config)
    this.request_form_object = this.createRequestFormObject()
    console.log(this.request_form_object)
  }

/**  
 * Method Creates a form group object from the request field value array
 */
 public createRequestFormObject(): FormGroup {
  let form_object = this.fb.group({
    header : this.fb.group({
      cc_emails: [[]]
    }),
    body : this.fb.group({

    }),
    footer: this.fb.group({
      file_attachments: []
    })
  });

  let group =  <FormGroup> form_object.get('body');
  this.request_form_config.forEach((field) => {
    group.addControl(field.name, this.fb.control([]));
  })

  return form_object;
 } 


 /**
  * Method creates a request form html template from the request field value array 
  */
 public createRequestFormTemplate(): string {
  const form_static_header = RequestFieldCreators.getRequestFormHeader();
  const form_dynamic_body = RequestFieldCreators.createFieldComponent(this.request_form_config); 
  const form_static_footer = RequestFieldCreators.getRequestFormFooter();
  
  return form_static_header + form_dynamic_body + form_static_footer;  
 }



 get request_header() { return this.request_form_object.get('header');}
 get request_body() { return this.request_form_object.get('body');}
 get request_footer() { return this.request_form_object.get('footer');}
 get get_emails() { return this.request_form_object.get('header.cc_emails');}
 
 
 /**
  * method to add cc email chip to cc_email material chip input
  */
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
  this.set_cc_emails_val()
}


/**
 * 
 * @param email the email string to be removed from the list of cc emails
 */
remove(email: string): void {
  const index = this.emails.indexOf(email);

  if (index >= 0) {
    this.emails.splice(index, 1);
  }
  this.set_cc_emails_val()
}

public set_cc_emails_val(){
  this.get_emails.setValue(this.emails)
}


  /**
   *  create a ticket object from the form data on form submit
   */
  submitTicket(){
    console.log(this.request_form_object.controls)
    this.ticket_request = {
      email_cc_ids: this.get_emails.value,
      description: this.request_body.value,
      priority: this.request_body.value.priority.value,
      requester_id: 22,
      organization_id: 33
    }
    console.log(this.ticket_request);
  }
}
