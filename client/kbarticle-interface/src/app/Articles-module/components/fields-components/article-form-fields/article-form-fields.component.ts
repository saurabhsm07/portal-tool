import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Article_Field } from '../../../classes/article_fields';

@Component({
  selector: 'app-article-form-fields',
  templateUrl: './article-form-fields.component.html',
  styleUrls: ['./article-form-fields.component.scss']
})
export class ArticleFormFieldsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
