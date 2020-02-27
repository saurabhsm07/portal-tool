import { Component, OnInit } from '@angular/core';
import { ArticleFieldService } from '../../../services/article-fields-service/article-field-service.service';
import { ArticleFormsService } from '../../../services/article-forms-service/article-forms.service';
import { Article_Field } from '../../../classes/article_fields';
import { Article_Form } from '../../../classes/article_form';
import { FormControl, Validators } from '@angular/forms';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss']
})
export class CreateArticleFormComponent implements OnInit {

  

  public article_fields_incl: Article_Field[];    // custom fields that are included in the custom article form
  public article_fields_excl: Article_Field[];    // custom fields that are not included in the custom article form 
  

  public form_name = new FormControl('', [Validators.required, Validators.minLength(10)]);

  /**
   * font awesome icons to used in field display UI
   */
  protected field_type_icon = {
    text : 'fa fa-text-width',
    textarea : 'fa fa-bars',
    dropdown: 'fa fa-caret-square-o-down',
    multiselect: 'fa fa-list',
    checkbox: 'fa fa-check-square-o',
    radiobox: 'fa fa-check-circle'
  };

  constructor(private articleFieldService: ArticleFieldService,
              private articleFormService: ArticleFormsService,
              private router: Router) { }

  ngOnInit() {
    this.articleFieldService.getArticleField()
                            .subscribe((data) => {
                              this.article_fields_excl = data;
                              this.article_fields_incl = [];
                            }, (err) => {
                              console.log(err);
                            });
  }

  /**
   * 
   * @param event article fields array elements to be added in or removed from the custom form creation
   */
  drop(event: CdkDragDrop<Article_Field[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }




  createForm(event) {

    const article_form: Article_Form = {
      name: this.form_name.value,
      article_fields:  JSON.stringify(this.article_fields_incl.map(field => field.id)),
      default_form: false,
      active: true,
      created_at: new Date(),
      updated_at: new Date(),

    };
    console.log(article_form);
    this.articleFormService.postArticleForm(article_form)
                           .subscribe((data) => {
                             console.log(data);
                             console.log('article published successfully');
                             this.router.navigate(['/article/forms/list']);
                            });

  }
}
