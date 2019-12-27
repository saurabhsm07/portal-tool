import { Component, OnInit, OnChanges,SimpleChanges, Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ArticleService } from './../../../services/article-service/article.service'
import { Article} from './../../../classes/article'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.scss']
})
export class DisplayArticleComponent implements OnInit, OnChanges {

  article$: Observable<Article>;
  @Input()
  articleObj : Article;
  
  @Input() 
  set articleObjVal(article: Article){
    console.log('in setvalue')
    this.preProcessArticleData(article)
    this.articleObj = Object.create(article);

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArticleService
  ) {}

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getArticle(params.get('id')))
    );
    
    this.article$.subscribe((data : Article) => {
      this.articleObj = data
      this.articleObj.body = Object.keys(JSON.parse(<string> data.body)).map((key) => { return {key: key, value: JSON.parse(<string> data.body)[key]}});
      this.articleObj.author = JSON.parse(<string> data.author)
      this.articleObj.draft = JSON.parse(<string> data.draft)
      this.articleObj.review_state = JSON.parse(<string> data.review_state)
      console.log(this.articleObj)
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes")
   console.log(changes)
   this.preProcessArticleData(changes.name)
  }

  preProcessArticleData(article){
    this.articleObj = article
    this.articleObj.body = JSON.parse(<string> article.body)
    this.articleObj.author = JSON.parse(<string> article.author)
    this.articleObj.draft = JSON.parse(<string> article.draft)
    this.articleObj.review_state = JSON.parse(<string> article.review_state)
  }

}
