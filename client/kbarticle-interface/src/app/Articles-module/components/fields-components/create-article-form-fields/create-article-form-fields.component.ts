import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-article-form-fields',
  templateUrl: './create-article-form-fields.component.html',
  styleUrls: ['./create-article-form-fields.component.scss']
})
export class CreateArticleFormFieldsComponent implements OnInit {

  field_type = [
    {name: 'text', value:1},
    {name: 'textarea', value:2},
    {name: 'dropdown', value:3},
    {name: 'checkbox', value: 4},
  ];

  value_map=[];

  article_fields_form = this.fb.group({
    type : [''],
    name : [''],
    description: [''],
    require: [''],
    readonly: [''],
    endUser_editable: [''],
    field_values: this.fb.array([ this.fb.control('')])
  })

  get field_values() {
    return this.article_fields_form.get('field_values') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  enableFieldValueOptions(value){
    if((value == 2) || (value == 3)){
      
    }
  }

  addFieldValueCol(event){
    console.log(event)
    console.log(this.field_values)
    this.field_values.push( this.fb.control(''))
    // this.field_values.removeAt()
  }

  ngOnInit() {
  }



}
