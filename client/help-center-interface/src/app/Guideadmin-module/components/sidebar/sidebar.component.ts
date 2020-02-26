import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }
  private menuList = ['segment', 'section', 'articles', 'categories','fields','forms', 'form', 'field'];
  private selectedOption = '';

  ngOnInit() {
    const currentUrl = this.router.url;
    const currentSection = this.menuList.find(x => currentUrl.indexOf(x) !=-1);
    if(currentSection != undefined){
      this.selectedOption = currentSection;
      console.log(currentSection)
      this.updateSidebar('settings');
    }
  }
  primarySidebarOptions = { home :     [{sectionName: 'published', name:'published', sectionUrl: '#'}, 
                                        {sectionName: 'drafts', name: 'drafts', sectionUrl: '#'}, 
                                        {sectionName: 'archived', name: 'archived', sectionUrl: '#'}],
                            // section: [{sectionName: 'Sectu', sectionUrl: '#' }, 
                            //             {sectionName: 'posts', sectionUrl: '#'}],
                            settings : [{sectionName:'Articles', name: 'articles', sectionUrl: '/guide/articles/list' }, 
                                        {sectionName: 'Article Fields', name: 'fields', sectionUrl: '/guide/article/fields/list'}, 
                                        {sectionName: 'Article Forms', name: 'forms', sectionUrl: '/guide/article/forms/list'},
                                        {sectionName: 'Sections', name: 'section', sectionUrl:'/guide/sections/home'},
                                        {sectionName: 'Categories', name:'categories', sectionUrl: '/guide/categories/home'},
                                        {sectionName: 'User Segments', name:'segment', sectionUrl: '/guide/segments/home'}]};
  secondarySidebarOptions : String[];
  
 updateSidebar(option){
  this.secondarySidebarOptions = this.primarySidebarOptions[option]
 }
}
