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

  searchResults: Observable<{articles: Article[],count: number}>;   //observable of type articles to be mapped to search articles API on string from RoutePath
  articles : Article [];
  articleCount: number;           //count of articles for this search
  articleSet : number;
  constructor(private fb: FormBuilder,
            private articleService: ArticleService,
            private route: ActivatedRoute,
            private router: Router) { }

  public search_hc_form = this.fb.group({
    searchString : []
  })

  get searchString(){ return this.search_hc_form.get('searchString')}
  ngOnInit() {

    this.searchResults = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.articleService.searchArticlesByText(params.get('query'), params.get('offset')
      ))
    );

    this.searchString.setValue(this.route.snapshot.queryParamMap.get('query'));
    this.articleSet = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.searchResults.subscribe((results) => {
                              
                              this.articles = results.articles;
                              this.articleCount = results.count
                                                        
                            },
                              (error) => {
                                console.log(error);
                              })
    
  }



  ifNextSetExists(count){
    if((count+this.articleSet)*10 < this.articleCount)
      return true;
    else
      return false
  }

  fetchNextSet(count){
    this.router.navigate([], {queryParams: {query: this.searchString.value, offset: this.articleSet+ count}})
  }
}
