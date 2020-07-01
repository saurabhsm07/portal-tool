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
    documentation : {
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
},

download: {
  201273863:{
    name: 'hotfix',
    childCategoryData:[
      {id:'200146630', name: 'Radia', downloadInfo:[{name:'Version 10.0', link:'hc/en-us/sections/id/202095986'},
      {name:'Version 10.0', link:'hc/en-us/sections/id/201393746'},
      {name:'Version 9.1', link:'hc/en-us/sections/id/200415080'},
      {name:'Version 9.0', link:'hc/en-us/sections/id/200415030'}], seeMore: '/hc/en-us/categories/id/200146190'},

      {id:'360001491012', name: 'Neuro', downloadInfo:[{name:'Neuro 1.2.3', link:'hc/en-us/articles/id/360023325112'}], seeMore: '/hc/en-us/categories/id/360001491012'},                                                                                                                                              
    ]
    
  },
  201258686: {
    name: 'patches',
    childCategoryData:[
      {id:'200146630', name: 'Radia', downloadInfo:[{name:'Version 10.0 CP2', link:'hc/en-us/articles/id/360002974651'},
      {name:'Version 10.0', link:'hc/en-us/sections/id/360000008323'},
      {name:'Version 9.2', link:'hc/en-us/sections/id/115000031223'},
      {name:'Version 9.1', link:'hc/en-us/sections/id/200781014'}], seeMore: '/hc/en-us/categories/id/200146630'},

      {id:'201186243', name: 'Rovius CloudPlatform', downloadInfo:[{name:'CloudPlatform 4.11', link:'hc/en-us/sections/id/360000008303'},
      {name:'CloudPlatform 4.7.x.x', link:'hc/en-us/sections/id/203011203'},
      {name:'CloudPlatform 4.5.x.x', link:'hc/en-us/sections/id/201834696'},
      {name:'CloudPlatform 4.3.x.x', link:'hc/en-us/sections/id/201828653'}], seeMore: '/hc/en-us/categories/id/201186243'},

      {id:'201181036', name: 'CPBM', downloadInfo:[{name:'CPBM 2.6.0', link:'hc/en-us/articles/id/115001581863'},
      {name:'CPBM 2.5.0', link:'hc/en-us/sections/id/115000593883'},
      {name:'CPBM 2.4.0', link:'hc/en-us/sections/id/201848866'},
      {name:'CPBM 2.3.x', link:'hc/en-us/sections/id/201848876'}], seeMore: '/hc/en-us/categories/id/201181036'},

      {id:'360000282832', name: 'Rovius', downloadInfo:[{name:'Rovius Cloud 1.3.1 Hotfix 01', link:'hc/en-us/articles/id/360002974651'}], seeMore: '/hc/en-us/categories/id/360000282832'},
    ]

  },
  201273853:{
    name:'product',
    childCategoryData:[
      {id:'200146230', name: 'Radia', downloadInfo:[{name:'Version 10.0', link:'/hc/en-us/articles/id/208592116'},
                                                {name:'Version 9.2', link:'/hc/en-us/articles/id/205628844'},
                                                {name:'Version 9.1', link:'/hc/en-us/articles/id/202755820'},
                                                {name:'Version 9.0', link:'/hc/en-us/articles/id/202042070'}], seeMore: '/hc/en-us/categories/id/200146230'},
      {id:'201174236', name: 'Rovius CloudPlatform', downloadInfo:[{name:'CloudPlatform 4.11.0', link:'/hc/en-us/articles/id/115005123863'},
                                                {name:'CloudPlatform 4.7.1', link:'/hc/en-us/articles/id/217979123'},
                                                {name:'CloudPlatform 4.7', link:'/hc/en-us/articles/id/208348643'},
                                                {name:'CloudPlatform 4.5.1', link:'/hc/en-us/articles/id/208251553'}], seeMore: '/hc/en-us/categories/id/201174236'},
      {id:'201187683', name: 'CPBM', downloadInfo:[{name:'CPBM 2.6.0', link:'/hc/en-us/articles/id/115005552406'},
                                                {name:'CPBM 2.5.0', link:'/hc/en-us/articles/id/115000576466'},
                                                {name:'CPBM 2.4.x', link:'/hc/en-us/articles/id/207948126'},
                                                {name:'CPBM 2.3.X', link:'/hc/en-us/articles/id/208255533'}], seeMore: '/hc/en-us/categories/id/201187683'},
      {id:'201253086', name: 'Sentient', downloadInfo:[{name:'Sentient 2.0.3', link:'/hc/en-us/articles/id/360001781571'},
                                                {name:'Sentient 2.0.1', link:'/hc/en-us/articles/id/115001846886'},
                                                {name:'Sentient 1.1', link:'/hc/en-us/articles/id/212343066'},
                                                {name:'Sentient 1.0', link:'/hc/en-us/articles/id/207820426'}], seeMore: '/hc/en-us/categories/id/201253086'},
      {id:'201253086', name: 'Rovius', downloadInfo:[{name:'Rovius Cloud 1.3.1', link:'/hc/en-us/sections/id/360000330932'},
                                                {name:'Rovius Cloud 1.3', link:'/hc/en-us/sections/id/360000030443'},
                                                {name:'Rovius Cloud 1.2', link:'/hc/en-us/sections/id/115001358643'}], seeMore: '/hc/en-us/categories/id/115000019143'},
      {id:'201253086', name: 'ShareInsights', downloadInfo:[{name:'ShareInsights 3.1 Sagittarius', link:'/hc/en-us/articles/id/360025496211'},
                                                {name:'ShareInsights 3.0 Phoenix', link:'/hc/en-us/articles/id/360021347391'},
                                                {name:'ShareInsights 2.8.15 Orion', link:'/hc/en-us/articles/id/360016108832'},
                                                {name:'ShareInsights 2.8.11 Octans', link:'/hc/en-us/articles/id/360007169532'}], seeMore: '/hc/en-us/categories/id/115000760023'},
      {id:'201253086', name: 'Neuro', downloadInfo:[{name:'Neuro 1.2.3.2', link:'/hc/en-us/articles/id/360025933012'},
                                                {name:'Neuro 1.2.3.1', link:'/hc/en-us/articles/id/360019806792'},
                                                {name:'Neuro 1.2.2', link:'/hc/en-us/articles/id/360015481972'},
                                                {name:'Neuro 1.2.1', link:'/hc/en-us/articles/id/360008697492'}], seeMore: '/hc/en-us/categories/id/360000578592'},
    ]
  }

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
      this.sectionArticlesObj[section.id] = { downloadInfo: [], see_more: section.html_url, isOpen: false };
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
 *  method checks if the category follows generic cateogyr template design or not
 * @param categoryId : id of the category in current hc view
 */
  public isGenericCategory(categoryId){
    
    if(((Object.keys(this.customCategoryTemplates.documentation).indexOf(categoryId.toString()) == -1))&&
        (Object.keys(this.customCategoryTemplates.download).indexOf(categoryId.toString()) == -1))
      return true
    else
      return false;

  }

  /**
   *method returns true if required template is of documentation category
   * @param categoryId id of the current category
   */
  public isDocumentationTemplate(categoryId){
    if(Object.keys(this.customCategoryTemplates.documentation).indexOf(categoryId.toString()) != -1)
      return true;
    else
      return false;
    
  }

  /**
   * method returns true if required template is of download category
   * @param categoryId id of the current category
   */
  public isDownloadTemplate(categoryId){
    if(Object.keys(this.customCategoryTemplates.download).indexOf(categoryId.toString()) != -1)
      return true;
    else
      return false;
    
  }

  /**
   * 
   * @param templateType : 
   * @param categoryId :
   */
  public getChildCategories(templateType, categoryId){
    console.log("child category")
    console.log(this.customCategoryTemplates[templateType][categoryId].childCategoryData);
    return this.customCategoryTemplates[templateType][categoryId].childCategoryData;
  }
}
