import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Article_Field } from '../../../classes/article_fields';
import {ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service'

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-article-form-fields',
  templateUrl: './article-form-fields.component.html',
  styleUrls: ['./article-form-fields.component.scss']
})
export class ArticleFormFieldsComponent implements OnInit {

  constructor(private articleFieldService : ArticleFieldService) { }

    private searchString : string = '';
    private users = [
    {id: 1, name: 'product'},
    {id: 2, name: 'versions'},
    {id: 3, name: 'type'},
    {id: 4, name: 'problem'},
    {id: 5, name: 'ticket-id'}
  ]
    articleFields : Article_Field[];

    dataSource : MatTableDataSource<Article_Field>;
    displayedColumns: string[];
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit() {
    this.articleFieldService.getArticleField()
                            .subscribe((data) => {
                              console.log(data)
                              this.articleFields= data;
                              console.log(this.articleFields)

                              this.displayedColumns = ['field_name', 'id', 'field_type', 'created_at'];

                              this.dataSource = new MatTableDataSource<Article_Field>(this.articleFields);
                              this.dataSource.paginator = this.paginator;

                            },
                          (error) => {
                            console.log("error occured")
                            console.log(error)
                          })
  }


}
