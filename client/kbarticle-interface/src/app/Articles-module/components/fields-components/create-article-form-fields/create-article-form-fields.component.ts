import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Article_Field } from './../../../classes/article_fields';
import { validateStyleParams } from '../../../../../../node_modules/@angular/animations/browser/src/util';

@Component({
  selector: 'app-create-article-form-fields',
  templateUrl: './create-article-form-fields.component.html',
  styleUrls: ['./create-article-form-fields.component.scss']
})
export class CreateArticleFormFieldsComponent implements OnInit {

  
  selectedType: number;                 //current selected field type
  hasValues: boolean = false;           // current selected field has option to add values or not


  /**
   * Different Available field type options 
   */
  field_type = [
    {name: 'text', value:1},
    {name: 'textarea', value:2},
    {name: 'dropdown', value:3},
    {name: 'multliselect', value:4},
    {name: 'checkbox', value: 5},
    {name: 'radiobox', value: 6}
  ];


  /**
   * Article field form built using form builder to create article fields 
   */
  article_fields_form = this.fb.group({
    // type : [''],
    name : [''],
    description: [''],
    required: [''],
    agentonly: [''],
    field_values: this.fb.array([ this.fb.control('')])
  })

  /**
   * Get Field values as form array
   */
  get field_values() {
    return this.article_fields_form.get('field_values') as FormArray;
  }

  constructor(private fb: FormBuilder) { }


  /**
   * Provide an option to add field values based on the type of field select by the user
   * 
   * @param type = type of article form field selected by the user eg. dropdown, text etc.
   */
  updateSelectedFieldType(type){
   
    this.selectedType = type.value;
    if(type.value != 1 && type.value != 2){
      this.hasValues = true;
    }
    else{
      this.hasValues  = false;
    }
  }



  /**
   * Add another could to add value to field_values list
   * 
   * @param index = position in field_values.value array for which this function was called
   */
  addFieldValueCol(index){
    console.log(this.field_values.value)
    if(this.field_values.value[index].length > 0){
      this.field_values.push( this.fb.control(''))
    }
  }

  /**
   * Remove value at index 'i' in the field_values.value array
   * 
   * @param i = position in field_values.value array for which this function was called
   */
  removeValue(i){
    if(i!=0)
    this.field_values.removeAt(i);
  }


  /**
   * Validation function to identify non unique entries in the field_values.value array
   * 
   * @param index = position in field_values.value array for which this function was called
   */
  validateFieldValues(index){
    const lenVal = this.field_values.value.filter((val, i) => (val == this.field_values.value[index] && (i != index)))
    console.log(lenVal)
    if(lenVal.length > 0){
      console.log(lenVal)
      console.log("cannot contain similar values")
    }
  }


  ngOnInit() { }



}
