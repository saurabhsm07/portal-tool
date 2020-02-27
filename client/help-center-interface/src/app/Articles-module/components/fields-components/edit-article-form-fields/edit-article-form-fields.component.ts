import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Article_Field } from '../../../classes/article_fields';

import { ArticleFieldService } from '../../../services/article-fields-service/article-field-service.service';
import { Observable } from 'rxjs';
import { Article } from '../../../classes/article';

@Component({
  selector: 'app-edit-article-form-fields',
  templateUrl: './edit-article-form-fields.component.html',
  styleUrls: ['./edit-article-form-fields.component.scss']
})
export class EditArticleFormFieldsComponent implements OnInit {

  article_field : Article_Field;    //article field fetched from the db to be edited using edit component
  article_field$ : Observable<Article_Field>;
  fieldType: Number;

  /**
   * Article field form built using form builder to edit article fields 
   */
  article_fields_form = this.fb.group({
    field_type : [''],
    field_name : ['', [Validators.required]],
    description: [''],
    required: [''],
    agent_only: [''],
    field_value: this.fb.array([])
  })

  // getter method to get form group control property
  get field_name(){return this.article_fields_form.controls['field_name'];}

  
    /**
   * Get Field values as form array
   */
  get field_value() {
    return this.article_fields_form.get('field_value') as FormArray;
  }

  /**
   * setEditFormValues () => function sets the initial values of article fields edit form
   */

  setEditFormValues(){
    this.article_field.field_value.forEach(element => {
      this.field_value.push(this.fb.group({ value : [element.value], name: [element.name]}))
      
    });

    console.log(this.fb.array(this.article_field.field_value))
    this.article_fields_form.patchValue({
      field_name: this.article_field.field_name,
      field_type : this.article_field.field_type,
      description: this.article_field.description,
      required: this.article_field.required,
      agent_only: this.article_field.agent_only
    })

  }
  constructor(private fb : FormBuilder,
              private articleFieldService : ArticleFieldService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.article_field$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.articleFieldService.getArticleFieldById(Number.parseInt(params.get('id'))))
    );

    this.article_field$.subscribe((data: Article_Field) => {
                    console.log(data)
                                  this.article_field = data;
                                  this.article_field.field_value = JSON.parse(data.field_value).map(value => JSON.parse(value));
                                  
                                  console.log(this.article_field)                                                                              
                                  this.setEditFormValues()
                                }, (error) => {
                                  console.log(error);
                                })
  }


    /**
   * Add another could to add value to field_values list
   * 
   * @param index = position in field_values.value array for which this function was called
   */
  addFieldValueCol(index){
    //Only 1 field value for check-box
    if(this.fieldType == 5){
      if(this.field_value.value.length < 1){
      if(this.field_value.value[index].length > 0){
        this.field_value.push( this.fb.group({ value : [0], name: ['']}))
      }
    }
    }

    //Only 2 field values for radiobox
    else if(this.fieldType == 6){
      if(this.field_value.value.length < 2)
      if(this.field_value.value[index].name.length > 0){
        this.field_value.push( this.fb.group({ value : [0], name: ['']}))
      }
    }

    //unlimited field values for multiselect and dropdown select
    else{
      if(this.field_value.value.filter(val => val.name.length > 0).length == this.field_value.value.length){
        if(this.field_value.value[index].name.length > 0){
          if(this.field_value.value[index].value == 0){
            this.setFieldValueAttr(index); 
          }
          this.field_value.push( this.fb.group({ value : [0], name: ['']}))
        }
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

  onSubmit(){
    console.log(this.article_fields_form.value)
    this.articleFieldService.updateArticleField(this.article_fields_form.value, this.article_field.id)
                            .subscribe((data) => {
                              if(data.id == 0){
                                console.log("specified field does not exist")
                              }else{
                                console.log("successfully updated article field with id "+ data.id);
                                this.router.navigate(['/article/fields/list'])
                              }
                                   
                                   
                            }, (error) => {
                              console.log(error)
                            })
  }


}
