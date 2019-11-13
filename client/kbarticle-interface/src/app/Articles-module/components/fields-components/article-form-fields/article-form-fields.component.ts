import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class ArticleFormFieldsComponent implements OnInit  {
  

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

    dataSource = new MatTableDataSource<Article_Field>();
    displayedColumns: string[];
    paginator: MatPaginator;
  
    @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
   }

  ngOnInit() {
    console.log("in ngon init")
    this.articleFieldService.getArticleField()
                            .subscribe((data) => {
                              console.log("fetched data");
                              this.articleFields= data;
                      

                              this.displayedColumns = ['field_name', 'id', 'field_type', 'created_at'];
                              this.dataSource.data = data;
                              this.dataSource.paginator = this.paginator;

                            },
                          (error) => {
                            console.log("error occured")
                            console.log(error)
                          })
  }


}
