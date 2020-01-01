import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import {Router } from'@angular/router';
import { Article_Field } from './../../../classes/article_fields';


import { ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service';
// import { validateStyleParams } from '../../../../../../node_modules/@angular/animations/browser/src/util';

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
    {name: 'multiselect', value:4},
    {name: 'checkbox', value: 5},
    {name: 'radiobox', value: 6}
  ];


  /**
   * Article field form built using form builder to create article fields 
   */
  article_fields_form = this.fb.group({
    field_type : [''],
    field_name : ['', [Validators.required]],
    description: [''],
    required: [''],
    agent_only: [''],
    field_value: this.fb.array([ this.fb.group({ value : [0], name: ['']})])
  })

  // getter method to get form group control property
  get field_name(){return this.article_fields_form.controls['field_name'];}

  constructor(private fb: FormBuilder,
              private articleFieldService :  ArticleFieldService,
              private router : Router) { }

  /**
   * Get Field values as form array
   */
  get field_value() {
    return this.article_fields_form.get('field_value') as FormArray;
  }

/**
 * Add field type to reactive forms
 */
  addFieldType(){
    this.article_fields_form
        .patchValue({field_type : this.field_type
                                      .filter(field => field.value == this.selectedType)[0].name})
  }




  /**
   * Provide an option to add field values based on the type of field select by the user
   * 
   * @param type = type of article form field selected by the user eg. dropdown, text etc.
   */
  updateSelectedFieldType(value){
   
    this.selectedType = value;
    if(value != 1 && value != 2 && value != 5){
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
    //Only 1 field value for check-box
    console.log(this.selectedType);
    if(this.selectedType == 5){
      if(this.field_value.value.length < 1){
      if(this.field_value.value[index].name.length > 0){
        if(this.field_value.value[index].value == 0){
          this.setFieldValueAttr(index); 
        }
        this.field_value.push( this.fb.group({ value : [''], name: ['']}))
      }
    }
    }

    //Only 2 field values for radiobox
    else if(this.selectedType == 6){
      if(this.field_value.value.length < 2)
      if(this.field_value.value[index].name.length > 0){
        if(this.field_value.value[index].value == 0){
          this.setFieldValueAttr(index); 
        }
        this.field_value.push( this.fb.group({ value : [''], name: ['']}))
      }
    }

    //unlimited field values for multiselect and dropdown select
    else{
      if(this.field_value.value[index].name.length > 0){
        if(this.field_value.value[index].value == 0){
          this.setFieldValueAttr(index); 
        }
        this.field_value.push(this.fb.group({ value : [''], name: ['']}))
      }
    }
    
  }

  /**
   * Function gives a unique value id to the field value name string
   * @param index = index of a field value object in the field value form array
   */
  private setFieldValueAttr(index: any) {
    this.field_value.value[index].value = this.field_value
                                              .value[index].name
                                              .split('')
                                              .map(x => x.charCodeAt())
                                              .reduce((a, b) => (a + b));

  }

  /**
   * Remove value at index 'i' in the field_values.value array
   * 
   * @param i = position in field_values.value array for which this function was called
   */
  removeValue(i){
    if(i!=0)
    this.field_value.removeAt(i);
  }


  /**
   * Validation function to identify non unique entries in the field_values.value array
   * 
   * @param index = position in field_values.value array for which this function was called
   */
  validateFieldValues(index){
    const commonVals = this.field_value.value.filter((val, i) => (val == this.field_value.value[index] && (i != index)))

    if(commonVals.length > 0){
      
      console.log("cannot contain similar values")
    }
  }

/**
 * Save Article Field Form Details to the Database on form submit
 */
  onSubmit(){
    this.addFieldType()
    console.log(this.article_fields_form.value)
    this.articleFieldService.postArticleField(this.article_fields_form.value)
                            .subscribe((data) => {
                              console.log("successfully saved the field to database")
                              console.log(data)
                              this.router.navigate(['/article/fields/list']);
                            },
                            (error)=>{
                              console.log(error)
                            })
  }


  ngOnInit() { }



}
