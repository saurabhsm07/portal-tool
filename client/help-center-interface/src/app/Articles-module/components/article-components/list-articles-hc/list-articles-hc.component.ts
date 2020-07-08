import { Component, OnInit, ViewChild } from '@angular/core';

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
              private userService: UserService) { }

  ngOnInit() {
  }

}
