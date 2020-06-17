import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { Article } from './../../../Articles-module/classes/article';
import { ArticleService } from './../../../Articles-module/services/article-service/article.service';
import { conditionallyCreateMapObjectLiteral } from '../../../../../node_modules/@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-helpcenter-search',
  templateUrl: './helpcenter-search.component.html',
  styleUrls: ['./helpcenter-search.component.scss']
})
export class HelpcenterSearchComponent implements OnInit {

  public searchResults: Observable<{articles: Article[],count: number}>;   //observable of type articles to be mapped to search articles API on string from RoutePath
  public articles : Article [];          // articles fetched from searchArticlesByText service
  public articleCount: number;           // count of articles for this search
  public articleSet : number;            // current set of articles being listed ; ex: 1 set = 10 articles

  public currentSearchString: string;      // search text for the current request

  public pageIndexes : number[];         // page index used for pagination


  constructor(private fb: FormBuilder,
              private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  public search_hc_form = this.fb.group({
    searchString : []
  })

  get searchString(){ return this.search_hc_form.get('searchString')}
  ngOnInit() {

    this.getSearchTermArticles();
    
  }


  /**
   * method gets articles from uri path
   */
  public getSearchTermArticles() {
    this.searchResults = this.route.queryParamMap.pipe(switchMap((params: ParamMap) => this.articleService.searchArticlesByText(params.get('query'), params.get('offset'))));
    this.searchString.setValue(this.route.snapshot.queryParamMap.get('query'));
    this.articleSet = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.pageIndexes = [1, 2, 3, 4, 5];
    this.pageIndexes = this.pageIndexes.map(pageIndex => pageIndex + this.articleSet - 1);
    // console.log(this.pageIndexes);
    this.searchResults.subscribe((results) => {
      this.articles = results.articles;
      this.articleCount = results.count;
      this.currentSearchString = this.searchString.value;
    }, (error) => {
      if (error.message == 'noarticle') {
        this.currentSearchString = this.searchString.value;
      }
      console.log(error);
    });
  }

  public ifNextSetExists(count){
    if((count)*10 < this.articleCount)
      return true;
    else                                 
      return false;
  }

  /**
   * get next set of articles from count offset
   * @param count : the number offset after which articles are to be fetched
   */
  public fetchNextSet(count){
    this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString.value, offset: count}});
  }

  /**
   * increment pagination buttons index
   * @param index : update pagination list by numeric index
   */
  public nextPageIndexes(index){
    if(this.articleSet + index < (this.articleCount/ 10)){
      this.pageIndexes = this.pageIndexes.map(pageIndex => pageIndex + index).filter( pageIndex => pageIndex < this.articleCount/10);
      this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString.value, 
                                              offset: this.articleSet+ this.pageIndexes[this.pageIndexes.length - 1]}});
    }
    
    
  }

  /**
   * decrement pagination buttons index
   * @param index : update pagination list by numeric index
   */
  public prevPageIndexes(index){
    
    // console.log(this.pageIndexes[0])
    if(this.pageIndexes[0] > 1){
      if(index == 1){
        this.pageIndexes = this.pageIndexes.map(pageIndex => pageIndex - index);
      }
      else{
        if((this.pageIndexes[0] - 5) < 0){
          this.pageIndexes = [1,2,3,4,5];
        }else{
          this.pageIndexes = this.pageIndexes.map(pageIndex => pageIndex - index);
        }
      }
      this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString.value, offset: this.articleSet+ this.pageIndexes[0]}});

    }else{
      this.pageIndexes = [1,2,3,4,5];
      this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString.value, offset: this.articleSet+ this.pageIndexes[0]}});
    }
  }


  public searchText(){
    
    console.log('this')
    // this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString.value, offset: 0}});
    const url = this.router.createUrlTree([], {relativeTo: this.route, 
                                               queryParams: {query: this.searchString.value, 
                                                             offset: 0}}).toString()

    this.location.go(url);
    window.location.replace(url);                                                   
  }
}
