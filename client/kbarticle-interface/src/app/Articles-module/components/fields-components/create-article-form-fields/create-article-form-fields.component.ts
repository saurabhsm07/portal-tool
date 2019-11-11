import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Article_Field } from './../../../classes/article_fields';

@Component({
  selector: 'app-create-article-form-fields',
  templateUrl: './create-article-form-fields.component.html',
  styleUrls: ['./create-article-form-fields.component.scss']
})
export class CreateArticleFormFieldsComponent implements OnInit {

  selectedType: number;

  field_type = [
    {name: 'text', value:1},
    {name: 'textarea', value:2},
    {name: 'dropdown', value:3},
    {name: 'multliselect', value:4},
    {name: 'checkbox', value: 5},
    {name: 'radiobox', value: 6}
  ];

  value_map=[];

  article_fields_form = this.fb.group({
    // type : [''],
    name : [''],
    description: [''],
    required: [''],
    agentonly: [''],
    field_values: this.fb.array([ this.fb.control('')])
  })

  get field_values() {
    return this.article_fields_form.get('field_values') as FormArray;
  }

  constructor(private fb: FormBuilder) { }


  updateSelectedFieldType(value){
    if(this.selectedType == 1 || this.selectedType == 2){

    }
    this.selectedType = value.value;
    console.log(this.selectedType)
  }

  // enableFieldValueOptions(value){
  //   if((value == 2) || (value == 3)){
      
  //   }
  // }

  addFieldValueCol(index){
    console.log(this.field_values.value)
    if(this.field_values.value[index].length > 0){
      this.field_values.push( this.fb.control(''))
    }
  }

  removeValue(i){
    if(i!=0)
    this.field_values.removeAt(i);
  }


  ngOnInit() {
    console.log(this.selectedType)
  }



}
