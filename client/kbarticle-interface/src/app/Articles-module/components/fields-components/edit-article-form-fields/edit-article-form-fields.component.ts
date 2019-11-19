import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';import { switchMap } from 'rxjs/operators'
import { Article_Field } from './../../../classes/article_fields';

import { ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service';
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

  /**
   * Article field form built using form builder to edit article fields 
   */
  article_fields_form = this.fb.group({
    field_type : [''],
    field_name : [''],
    description: [''],
    required: [''],
    agent_only: [''],
    field_value: this.fb.array([])
  })

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
      this.field_value.push(this.fb.control(''))
      
    });

    console.log(this.fb.array(this.article_field.field_value))
    this.article_fields_form.setValue({
      field_name: this.article_field.field_name,
      field_type : this.article_field.field_type,
      description: this.article_field.description,
      required: this.article_field.required,
      agent_only: this.article_field.agent_only,
      field_value: this.article_field.field_value
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
      this.article_field = data[0];
      console.log(data)
      this.article_field.field_value = JSON.parse( data[0].field_value);
      
      console.log(this.article_field)                                                                              
      this.setEditFormValues()
    })
  }


  


}
