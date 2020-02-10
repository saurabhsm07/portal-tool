import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Category } from './../../classes/category';
import { Section } from '../../../Section-module/classes/section';
import { CategoryService } from './../../services/category-service/category.service';
import { SectionService } from './../../../Section-module/services/section-service/section.service';
import { ArticleService } from './../../../Articles-module/services/article-service/article.service';
import { Article } from '../../../Articles-module/classes/article';


@Component({
  selector: 'app-view-category-hc',
  templateUrl: './view-category-hc.component.html',
  styleUrls: ['./view-category-hc.component.scss'],
  animations: [
              trigger('collapse', [
                state('close', style({
                  height: '200px',
                  opacity: 1,
                  backgroundColor: 'yellow',
                  display: 'none',
                })),
              state('open', style({
                height: '400px',
                opacity: 1,
                backgroundColor: 'yellow',
                display: 'block'
              })),
          transition('close=>open',[ animate(2000)])])
          ]
              
})
export class ViewCategoryHcComponent implements OnInit {
  category$: Observable<Category>;  // observable to map category i.d from angular route path and call get category by id API
  category: Category;               // category object to store category record field values
  sectionList: Section[];
  articleList: Article[];

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
  }
  constructor(private router: Router,
    private categoryService: CategoryService,
    private sectionService: SectionService,
    private articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.category$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.categoryService.getCategory(params.get('id')))
    );

    this.category$.subscribe((category) => {
                              this.category = category;
                              this.getSectionsFromCategory();
                            },
                              (error) => {
                                console.log(error);
                              })
  }


  private getSectionsFromCategory() {
    this.sectionService.getSectionInCategory(this.category.id.toString())
      .subscribe((sectionsList) => {
        this.sectionList = sectionsList;
        console.log(this.sectionList);
      }, (error) => {
        console.log(error);
      });
  }

   public getArticlesfromSection(sectionId) {
    this.toggle();
    this.articleService.getArticlesWithSectionId(sectionId)
                       .subscribe((articles) => {
                         this.articleList = articles;
                         console.log(this.articleList);
                       })
  }
}
