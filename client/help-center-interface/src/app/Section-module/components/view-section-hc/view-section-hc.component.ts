import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { Section } from '../../classes/section';
import { Article } from '../../../Articles-module/classes/article';

import { SectionService } from '../../services/section-service/section.service';
import { ArticleService } from '../../../Articles-module/services/article-service/article.service';


@Component({
  selector: 'app-view-section-hc',
  templateUrl: './view-section-hc.component.html',
  styleUrls: ['./view-section-hc.component.scss']
})
export class ViewSectionHcComponent implements OnInit {


  section$: Observable<Section>;     // observable to map section i.d from angular route path and call get section by id API
  public section : Section;
  public article_list : Article[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private sectionService: SectionService,
              private articleService: ArticleService) { }

  ngOnInit() {

      this.section$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.sectionService.getSection(params.get('id')))
    );

    this.section$.subscribe((section) => {
      this.section = section;
      this.getArticlesInSection();
    },
      (error) => {
        console.log(error);
      })
  }

  /**
   * Get articles in perticular section
   */
  public getArticlesInSection() {
    this.articleService.getArticlesWithSectionId(this.section.id.toString())
      .subscribe((articles) => {
        this.article_list = articles;
      }, (error) => {
        console.log(error);
      });
  }
}
