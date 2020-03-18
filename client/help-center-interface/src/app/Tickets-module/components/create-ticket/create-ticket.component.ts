import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Form } from '../../classes/form';
import { Field } from '../../classes/field';
import { FormService } from './../../services/ticket-forms-service/form.service';
import { FieldService } from './../../services/ticket-fields-service/field.service';
import { Field_value } from '../../classes/field_value';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  form$: Observable<any>;
  ticket_form: Form;
  ticket_form_fields: Field_value[];
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private ticketFormService: FormService,
              private ticketFieldService: FieldService,
              private fb : FormBuilder) { }
  
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
        console.log(this.ticket_form_fields);
      }, (error) => {
        console.log(error);
      });
  }
}
