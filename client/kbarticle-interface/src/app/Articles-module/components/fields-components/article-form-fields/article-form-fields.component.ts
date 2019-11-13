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

    searchString : string = '';
    users = [
    {id: 1, name: 'product'},
    {id: 2, name: 'versions'},
    {id: 3, name: 'type'},
    {id: 4, name: 'problem'},
    {id: 5, name: 'ticket-id'}
  ]
  ngOnInit() {
  }


}
