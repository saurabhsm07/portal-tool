import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
export class ArticleFormFieldsComponent implements OnInit, OnChanges  {
  
  

  constructor(private articleFieldService : ArticleFieldService) { }

    private searchString : string = '';   //parameter for dynamic search article fields table
    private articleFields : Article_Field[]; //article fields list

    dataSource = new MatTableDataSource<Article_Field>(); //datasource
    displayedColumns: string[];     //saves column names of the article fields table
    paginator: MatPaginator;        //paginator for paginating the data table
  
    @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
   }

  ngOnInit() {
this.articleFieldService.getArticleField()
                            .subscribe((data) => {
                              console.log("fetched data");
                              this.articleFields= data;
                      

                              this.displayedColumns = ['field_name', 'id', 'field_type', 'created_at'];
                              this.dataSource.data = this.articleFields;
                              this.dataSource.paginator = this.paginator;
                              this.dataSource.filter = this.searchString;

                            },
                          (error) => {
                            console.log("error occured")
                            console.log(error)
                          })
  }

  filterTable(){
    this.dataSource.filter = this.searchString;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }


}
