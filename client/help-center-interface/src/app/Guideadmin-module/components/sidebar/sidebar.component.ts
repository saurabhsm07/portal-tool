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
                            settings : [{sectionName:'Articles', name: 'articles', sectionUrl: '/articles/list' }, 
                                        {sectionName: 'Article Fields', name: 'fields', sectionUrl: '/article/fields/list'}, 
                                        {sectionName: 'Article Forms', name: 'forms', sectionUrl: '/article/forms/list'},
                                        {sectionName: 'Sections', name: 'section', sectionUrl:'/sections/home'},
                                        {sectionName: 'Categories', name:'categories', sectionUrl: '/categories/home'},
                                        {sectionName: 'User Segments', name:'segment', sectionUrl: '/segments/home'}]};
  secondarySidebarOptions : String[];
  
 updateSidebar(option){
  this.secondarySidebarOptions = this.primarySidebarOptions[option]
 }
}
