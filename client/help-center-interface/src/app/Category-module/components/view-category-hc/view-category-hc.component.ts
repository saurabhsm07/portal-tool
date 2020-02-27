import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Category } from '../../classes/category';
import { Section } from '../../../Section-module/classes/section';
import { CategoryService } from '../../services/category-service/category.service';
import { SectionService } from '../../../Section-module/services/section-service/section.service';
import { ArticleService } from '../../../Articles-module/services/article-service/article.service';
import { Article } from '../../../Articles-module/classes/article';


@Component({
  selector: 'app-view-category-hc',
  templateUrl: './view-category-hc.component.html',
  styleUrls: ['./view-category-hc.component.scss'],
  animations: [
              trigger('collapse', [
                state('close', style({
                  height: '',
                  opacity: 0,
                  backgroundColor: '',
                  display: 'none'
                })),
              state('open', style({
                height: '',
                opacity: 1,
                backgroundColor: ''
              })),
          transition('close => open', [animate('0.5s')]),
          transition('open => close', [animate('0.5s')])])
          ]
              
})
export class ViewCategoryHcComponent implements OnInit {
  category$: Observable<Category>;  // observable to map category i.d from angular route path and call get category by id API
  category: Category;               // category object to store category record field values
  section_list: Section[];          // list of sections in the specific category
  article_list: Article[];          // list of articles in perticular section
  current_section: number;
  section_articles_obj: {}          // data structure to map articles to section for template generation in UI



  toggle(section_id) {
    this.section_articles_obj[section_id].isOpen = !this.section_articles_obj[section_id].isOpen;

  }
  constructor(private router: Router,
    private categoryService: CategoryService,
    private sectionService: SectionService,
    private articleService: ArticleService,
    private route: ActivatedRoute) { 
      this.section_articles_obj = {};
    }

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


  /**
   * Get all sections with perticular category i.d
   */
  public getSectionsFromCategory() {
    this.sectionService.getSectionInCategory(this.category.id.toString())
      .subscribe((sectionsList) => {
        this.section_list = sectionsList;
        this.current_section = this.section_list[0].id;
        console.log(this.section_list);
        this.initializeSectionArticleObject();
        // console.log(this.section_articles_obj);
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * initializes section article object for rendering in template
   */
  public initializeSectionArticleObject() {
    this.section_list.forEach((section, index) => {
      this.section_articles_obj[section.id] = { articles: [], see_more: section.html_url, isOpen: false };
    });
  }

  /**
   * fetch articles with section id if not already fetched
   * @param section_id : id of the section from which articles are to be fetched
   */
   public getArticlesfromSection(section_id) {
     this.current_section = section_id;

    
    // console.log(this.section_articles_obj[section_id].articles.length);
    this.toggle(section_id);
    if(this.section_articles_obj[section_id].articles.length == 0){
      this.articleService.getArticlesWithSectionId(section_id)
      .subscribe((articles) => {
        this.article_list = articles;
        this.section_articles_obj[section_id].articles = this.article_list;
        
        console.log(this.section_articles_obj[section_id].articles.length);
      })
    }
  

  }
}
