import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { Article } from './../../../Articles-module/classes/article';
import { ArticleService } from './../../../Articles-module/services/article-service/article.service';


@Component({
  selector: 'app-helpcenter-search',
  templateUrl: './helpcenter-search.component.html',
  styleUrls: ['./helpcenter-search.component.scss']
})
export class HelpcenterSearchComponent implements OnInit {

  articles$: Observable<Article[]>;   //observable of type articles to be mapped to search articles API on string from RoutePath
  articles : Article [];
  constructor(private fb: FormBuilder,
            private articleService: ArticleService,
            private route: ActivatedRoute) { }

  public search_hc_form = this.fb.group({
    searchString : []
  })

  get searchString(){ return this.search_hc_form.get('searchString')}
  ngOnInit() {

    this.articles$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.articleService.searchArticlesByText(params.get('query')))
    );

    this.searchString.setValue(this.route.snapshot.queryParamMap.get('query'))
    
    this.articles$.subscribe((articles) => {
                              this.articles = articles;
                              console.log(articles)
                                                        
                            },
                              (error) => {
                                console.log(error);
                              })
    
  }

}
