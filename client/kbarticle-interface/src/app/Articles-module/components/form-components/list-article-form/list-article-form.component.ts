import { Component, OnInit } from '@angular/core';

import { ArticleFormsService } from './../../../services/article-forms-service/article-forms.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Article_Form } from 'src/app/Articles-module/classes/article_form';

@Component({
  selector: 'app-list-article-form',
  templateUrl: './list-article-form.component.html',
  styleUrls: ['./list-article-form.component.scss']
})
export class ListArticleFormComponent implements OnInit {

  constructor(private articleFormService: ArticleFormsService) { }

  private searchString = '';   // parameter for dynamic search article forms table
  private articleForms: Article_Form[]; // article forms list

  dataSource = new MatTableDataSource<Article_Form>(); // datasource
  displayedColumns: string[];     // saves column names of the article fields table
  paginator: MatPaginator;        // paginator for paginating the data table

  ngOnInit() {
    this.articleFormService.getArticleForm()
                            .subscribe((data) => {
                              console.log(data);
                              this.articleForms = data;

                              this.displayedColumns = ['name', 'id', 'created_at'];
                              this.dataSource.data = this.articleForms;
                              this.dataSource.paginator = this.paginator;
                              this.dataSource.filter = this.searchString;

                            },
                            (error) => {
                              console.log('error occured');
                              console.log(error);
                            });
  }

  filterTable() {
    this.dataSource.filter = this.searchString;
  }

}
