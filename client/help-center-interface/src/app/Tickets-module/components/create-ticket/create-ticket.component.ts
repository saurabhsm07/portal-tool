import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import { Form } from '../../classes/form';
import { Field } from '../../classes/field';
import { FormService } from './../../services/ticket-forms-service/form.service';
import { FieldService } from './../../services/ticket-fields-service/field.service';
import { Field_value } from '../../classes/field_value';
import { RequestFieldCreators } from './../../../imports/request-field-component-creators';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  form$: Observable<any>;
  ticket_form: Form;                       //current request form object      
  ticket_form_fields: Field_value[];      //ticket request fields and values for current form
  request_form_template = '';             //html form template generated from request form fields
  emails : string[] = [];                 // email field used in form field material chip element 
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ticketFormService: FormService,
              private ticketFieldService: FieldService,
              private fb : FormBuilder) { }
  

  ticket_request_form = this.fb.group({
    header: this.fb.group({

    }),
    body: this.fb.group({

    }),
    footer: this.fb.group({
      
    })
  })



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
  private getFieldValueData() {
    this.ticketFieldService.getFieldsByIds(this.ticket_form.ticket_field_ids)
      .subscribe((data) => {
        this.ticket_form_fields = data;
        this.create_request_form()
      }, (error) => {
        console.log(error);
      });
  }


  /**
   * Method to create ticket request form template from request fields list
   */
  public create_request_form(){
   this.request_form_template = RequestFieldCreators.createFieldComponent(this.ticket_form_fields)
   console.log(this.request_form_template)
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
}
