import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KB article module';
  primarySidebarOptions = { home :     [{sectionName: 'published', sectionUrl: '#'}, 
                                        {sectionName: 'drafts', sectionUrl: '#'}, 
                                        {sectionName: 'archived', sectionUrl: '#'}],
                            // section: [{sectionName: 'Sectu', sectionUrl: '#' }, 
                            //             {sectionName: 'posts', sectionUrl: '#'}],
                            settings : [{sectionName:'Articles', sectionUrl: '/articles/list' }, 
                                        {sectionName: 'Article Fields', sectionUrl: '/article/fields/list'}, 
                                        {sectionName: 'Article Forms', sectionUrl: '/article/forms/list'},
                                        {sectionName: 'Sections', sectionUrl:'/sections/home'},
                                        {sectionName: 'Categories', sectionUrl: '/categories/home'}]};
  secondarySidebarOptions : String[];
  
 updateSidebar(option){
  this.secondarySidebarOptions = this.primarySidebarOptions[option]
 }
}
