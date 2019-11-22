import { Component, OnInit } from '@angular/core';
import { ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service'
import { Article_Field } from './../../../classes/article_fields'
import {} from './../.././../classes/article_form'

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { element } from '../../../../../../node_modules/protractor';
@Component({
  selector: 'app-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss']
})
export class CreateArticleFormComponent implements OnInit {

  private article_fields_incl : Article_Field[];
  private article_fields_excl : Article_Field[];

  protected field_type_icon = {
    text : 'fa fa-text-width',
    textarea : 'fa fa-bars',
    dropdown: 'fa fa-caret-square-o-down',
    multiselect: 'fa fa-list',
    checkbox: 'fa fa-check-square-o',
    radiobox: 'fa fa-check-circle'
  }

  constructor(private articleFieldService : ArticleFieldService) { }

  ngOnInit() {
    this.articleFieldService.getArticleField()
                            .subscribe((data) => {
                              this.article_fields_excl = data.filter((element, i) => i%2 == 0)
                              this.article_fields_incl = data.filter((element, i) => i%2 == 1)
                            }, (err) =>{
                              console.log(err)
                            })
  }

  drop(event: CdkDragDrop<Article_Field[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  createForm(event){
    console.log("submitting form")
  }
}
