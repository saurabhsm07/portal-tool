import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../../classes/article'
import { ArticleService } from '../../../services/article-service/article.service'

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  public articles : Article[];   // List of Article objects
  public searchString = '';   // parameter for dynamic search articles table

  dataSource = new MatTableDataSource<Article>(); // datasource of type 'Article' for mat-table 
  displayedColumns: string[];     // saves column names of the article fields table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    }

  constructor(private articleService : ArticleService,
              private route: Router) { }

  ngOnInit() {
    this.articleService.listArticles()
                       .subscribe((data) => {
                         console.log(data);
                         this.articles = data;

                         
                         this.displayedColumns = ['title', 'status', 'created_at', 'edit'];
                         this.dataSource.data = this.articles;
                         this.dataSource.paginator = this.paginator;
                         this.dataSource.filter = this.searchString;

                       },
                      (error) => {
                        console.log("error occured");
                        console.log(error);
                      })
  }

  draftStatusPipe(status){
    return JSON.parse(status).type;
  }

  reviewStatusPipe(reviewState){
    return JSON.parse(reviewState).state;
  }

  authorPipe(author){
    return JSON.parse(author).name;
  }

  sectionPipe(section){
    return JSON.parse(section).name;
  }

  viewArticle(articleId){
    this.route.navigate(['/guide/articles/id/'+articleId])
  }

}
