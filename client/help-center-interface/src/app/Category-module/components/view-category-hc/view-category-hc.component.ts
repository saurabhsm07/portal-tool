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
  
  //list of category data objects who have custom design templates  and do not follow general structure
  customCategoryTemplates = {
    201273833: {
      name: 'Product Manuals',
      childCategoryData: [
        {id: '200146610', tagline: 'One tool to manage your entire endpoint universe', name: 'Radia Endpoint Manager', nameIcon: 'assets/images/radia-cat-icon.png', backImg: 'assets/images/radia-cat-back.jpg' },
        {id: '201183733', tagline: 'An integrated fully hybrid cloud platform that makes it simple for enterprises to run private clouds, without the need for 		special technology skills', name: 'Hybrid Enterprise Cloud', nameIcon: 'assets/images/roviuscp-cat-icon.png', backImg: 'assets/images/roviuscp-cat-back.jpg' },
        {id: 'cpbmModal', tagline: 'Cloud platform business manager', name: 'CPBM', nameIcon: 'assets/images/cpbm-cat-icon.png', backImg: 'assets/images/cpbm-cat-back.jpg' },
        {id: '201284083', tagline: 'Impeccable endpoint management that safeguards the security posture of enterprises in a few seconds', name: 'Endpoint Management Security', nameIcon: 'assets/images/sentient-cat-icon.png', backImg: 'assets/images/sentient-cat-back.png' },
        {id: '360003439852', tagline: 'Make it easy for app developers to treat complex protocols like they were no different from any other web service', name: 'Aepona IoT', nameIcon: 'assets/images/aepona-cat-icon.png', backImg: 'assets/images/aepona-cat-back.jpg' }
      ]
    },
    201264926: {
      name: 'Agent Only',
      childCategoryData: [
        {id: '201284063', tagline: 'One tool to manage your entire endpoint universe', name: 'Radia Endpoint Manager', nameIcon: 'assets/images/radia-cat-icon.png', backImg: 'assets/images/radia-cat-back.jpg' },
        {id: '201174856', tagline: 'An integrated fully hybrid cloud platform that makes it simple for enterprises to run private clouds, without the need for 		special technology skills', name: 'Hybrid Enterprise Cloud', nameIcon: 'assets/images/roviuscp-cat-icon.png', backImg: 'assets/images/roviuscp-cat-back.jpg' },
        {id: '201267586', tagline: 'Accelerite', name: 'Accelerite', nameIcon: 'assets/images/accelerite-cat-icon.png', backImg: 'assets/images/accelerite-cat-back.png' },
        {id: '201629406', tagline: 'Make it easy for app developers to treat complex protocols like they were no different from any other web service', name: 'Aepona IoT', nameIcon: 'assets/images/aepona-cat-icon.png', backImg: 'assets/images/aepona-cat-back.jpg' },
        {id: '201284083', tagline: 'Impeccable endpoint management that safeguards the security posture of enterprises in a few seconds', name: 'Endpoint Management Security', nameIcon: 'assets/images/sentient-cat-icon.png', backImg: 'assets/images/sentient-cat-back.png' }
      ]

    },
    201273823: {
      name: 'Help Articles',
      childCategoryData: [
        {id: '200146250', tagline: 'One tool to manage your entire endpoint universe', name: 'Radia Endpoint Manager', nameIcon: 'assets/images/radia-cat-icon.png', backImg: 'assets/images/radia-cat-back.jpg' },
        {id: '201174846', tagline: 'An integrated fully hybrid cloud platform that makes it simple for enterprises to run private clouds, without the need for 		special technology skills', name: 'Hybrid Enterprise Cloud', nameIcon: 'assets/images/roviuscp-cat-icon.png', backImg: 'assets/images/roviuscp-cat-back.jpg' },
        {id: '115000147066', tagline: 'Impeccable endpoint management that safeguards the security posture of enterprises in a few seconds', name: 'Endpoint Management Security', nameIcon: 'assets/images/sentient-cat-icon.png', backImg: 'assets/images/sentient-cat-back.png' },
        {id: '360000464971', tagline: 'Powerful big data analytics platform with an easy-to-use self-service interface for data preparation, analysis, visualization, and machine learning', name: 'Data Analytics', nameIcon: 'assets/images/si-cat-icon.png', backImg: 'assets/images/si-cat-icon.png' },
      ]
  }
  
  }

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
    console.log(Object.keys(this.customCategoryTemplates))
    if(Object.keys(this.customCategoryTemplates).indexOf(categoryId.toString()) == -1)
      return true;
    else
      return false;

  }
}
