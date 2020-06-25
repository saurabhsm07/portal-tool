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
  sectionList: Section[];          // list of sections in the specific category
  articleList: Article[];          // list of articles in perticular section
  currentSection: number;
  sectionArticlesObj: {}          // data structure to map articles to section for template generation in UI
  customCategoryTemplates: number [] = [201273833, 201273823, 201264926] //list of category ids who have custom design templates  and do not follow general structure


  toggle(section_id) {
    this.sectionArticlesObj[section_id].isOpen = !this.sectionArticlesObj[section_id].isOpen;

  }
  constructor(private router: Router,
    private categoryService: CategoryService,
    private sectionService: SectionService,
    private articleService: ArticleService,
    private route: ActivatedRoute) { 
      this.sectionArticlesObj = {};
    }

  ngOnInit() {
    this.category$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.categoryService.getCategory(params.get('id')))
    );

    this.category$.subscribe((category) => {
                              this.category = category;
                              console.log(this.category)
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
        this.sectionList = sectionsList;
        this.currentSection = this.sectionList[0].id;
        console.log(this.sectionList);
        this.initializeSectionArticleObject();
        // console.log(this.sectionArticlesObj);
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * initializes section article object for rendering in template
   */
  public initializeSectionArticleObject() {
    this.sectionList.forEach((section, index) => {
      this.sectionArticlesObj[section.id] = { articles: [], see_more: section.html_url, isOpen: false };
    });
  }

  /**
   * fetch articles with section id if not already fetched
   * @param section_id : id of the section from which articles are to be fetched
   */
   public getArticlesfromSection(section_id) {
     this.currentSection = section_id;

    
    // console.log(this.sectionArticlesObj[section_id].articles.length);
    this.toggle(section_id);
    if(this.sectionArticlesObj[section_id].articles.length == 0){
      this.articleService.getArticlesWithSectionId(section_id, 10)
      .subscribe((articles) => {
        this.articleList = articles;
        this.sectionArticlesObj[section_id].articles = this.articleList;
        
        console.log(this.sectionArticlesObj[section_id].articles.length);
      })
    }
  

  }

/**
 *  method checks if the category is valid or not
 * @param categoryId : id of the category in current hc view
 */
  public isGenericCategory(categoryId){
    if(this.customCategoryTemplates.indexOf(categoryId) == -1)
      return true;
    else
      return false;

  }
}
