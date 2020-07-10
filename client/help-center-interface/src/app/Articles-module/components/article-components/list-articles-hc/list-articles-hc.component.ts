import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from './../../../../User-module/services/user-service/user.service';
import { ArticleService } from './../../../services/article-service/article.service'
import { Article } from '../../../classes/article';
@Component({
  selector: 'app-list-articles-hc',
  templateUrl: './list-articles-hc.component.html',
  styleUrls: ['./list-articles-hc.component.scss']
})
export class ListArticlesHcComponent implements OnInit {

  public articles: Article[] // list of articles created by current logged in agent
  public searchString = ''; //string used to filter ArticleList on article title

  dataSource = new MatTableDataSource<Article>(); // datasource of type 'Article' for mat-table 
  displayedColumns: string[];     // saves column names of the segment table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  constructor(private articleService: ArticleService,
              private userService: UserService,
              private route: Router) { }

              ngOnInit() {
                this.fetchAuthorArticles();
              }

  public fetchAuthorArticles() {
    const authorId = this.userService.getUserId();
    this.articleService.listArticlesByAuthor(authorId.toString())
      .subscribe((data) => {
        console.log(data);
        this.articles = data;
        this.displayedColumns = ['title', 'status', 'created_at', 'section', 'edit'];
        this.dataSource.data = this.articles;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.searchString;
      }, (error) => {
        console.log("error occured");
        console.log(error);
      });
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
                return '/hc/en-us/articles/id/'+articleId;
              }

              editArticle(articleId){
                this.route.navigate(['/guide/articles/id/'+articleId])
              }
}
