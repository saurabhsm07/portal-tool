import { Component, OnInit } from '@angular/core';
import {Article } from './../../classes/article'
import { ArticleService } from './../../services/article-service/article.service'

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  articles : Article[];
  constructor(private articleService : ArticleService) { }

  ngOnInit() {
    this.articleService.listArticles()
                       .subscribe((data) => {
                         console.log(data)
                         this.articles = data;
                       },
                      (err) => {
                        console.log("error occured")
                        console.log(err)
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

}
