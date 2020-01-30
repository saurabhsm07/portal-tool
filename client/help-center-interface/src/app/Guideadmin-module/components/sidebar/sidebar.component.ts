import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  primarySidebarOptions = { home :     [{sectionName: 'published', sectionUrl: '#'}, 
                                        {sectionName: 'drafts', sectionUrl: '#'}, 
                                        {sectionName: 'archived', sectionUrl: '#'}],
                            // section: [{sectionName: 'Sectu', sectionUrl: '#' }, 
                            //             {sectionName: 'posts', sectionUrl: '#'}],
                            settings : [{sectionName:'Articles', sectionUrl: '/articles/list' }, 
                                        {sectionName: 'Article Fields', sectionUrl: '/article/fields/list'}, 
                                        {sectionName: 'Article Forms', sectionUrl: '/article/forms/list'},
                                        {sectionName: 'Sections', sectionUrl:'/sections/home'},
                                        {sectionName: 'Categories', sectionUrl: '/categories/home'},
                                        {sectionName: 'User Segments', sectionUrl: '/segments/home'}]};
  secondarySidebarOptions : String[];
  
 updateSidebar(option){
  this.secondarySidebarOptions = this.primarySidebarOptions[option]
 }
}
