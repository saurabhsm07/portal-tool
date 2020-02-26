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
  article_object : Article;
  


  private fieldValues = {};
  private fieldInformation = {};

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
      this.article_object = data;
      // this.article_object.body = Object.keys(data.body).map((key) => { return { key: key, value: data.body[key] }; });
      console.log(this.article_object);

      if(Array.isArray(this.article_object.body)){
        this.fieldInformation = this.article_object.body.filter(obj => obj.key == "fieldInformation")[0].value;
        this.fieldValues = this.article_object.body.filter(obj => obj.key == "fieldValues")[0].value;
      }

    if(Array.isArray(this.article_object.body)){
      this.article_object.body.forEach(element => {
        if(Array.isArray(element.value)){
          element.value = element.value.map(ele => this.fieldValues[ele])
        }
      });
    }
      

  })

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes")
   console.log(changes)
   this.preProcessArticleData(changes.name)
  }

  preProcessArticleData(article){
    this.article_object = article
    this.article_object.body = JSON.parse(<string> article.body)
    this.article_object.author = JSON.parse(<string> article.author)
    this.article_object.draft = JSON.parse(<string> article.draft)
    this.article_object.review_state = JSON.parse(<string> article.review_state)
  }

  editArticle(){
    this.router.navigate(['/guide/articles/edit/id/'+this.article_object.id])
  }

}
