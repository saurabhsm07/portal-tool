import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Form } from '../../classes/form';
import { Field } from '../../classes/field';
import { FormService } from './../../services/ticket-forms-service/form.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  form$: Observable<any>;
  ticket_form: Form;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ticketFormService: FormService,
              private fb : FormBuilder) { }
  
  ngOnInit() {
    this.form$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.ticketFormService.getForm(params.get('id')))
    )

    this.form$.subscribe((formData) => {
      this.ticket_form = formData
      console.log(formData);
    }, (error) => {
      console.log(error);
    })
  }

}
