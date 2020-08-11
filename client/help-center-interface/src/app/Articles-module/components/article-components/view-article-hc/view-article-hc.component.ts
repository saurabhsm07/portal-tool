import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'jquery';

import { Article } from '../../../classes/article';
import { ArticleService } from '../../../services/article-service/article.service';
@Component({
  selector: 'app-view-article-hc',
  templateUrl: './view-article-hc.component.html',
  styleUrls: ['./view-article-hc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewArticleHcComponent implements OnInit {

  public article$: Observable<Article>;  //object used to create a observable of type Article for fetching data based on Url parameter
  public article: Article; // object of type article
  constructor( private articleService: ArticleService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchArticleData();
    
    $(document).ready(function(){
      $('.dwnlink').show();
    })
  }


    /**
   * Gets current article data from the URL i.d
   */
  public fetchArticleData() {
    this.article$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.articleService.getArticle(params.get('id'))));
    this.article$.subscribe((article: Article) => {
      this.article = article;
      console.log(this.article);
    }, (error) => {
      console.log(error);
    });
  }

}
