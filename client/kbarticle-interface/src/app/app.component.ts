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
                            community: [{sectionName: 'topics', sectionUrl: '#' }, 
                                        {sectionName: 'posts', sectionUrl: '#'}],
                            settings : [{sectionName:'Articles', sectionUrl: '/articles/list' }, 
                                        {sectionName: 'Article Fields', sectionUrl: '/article/field/list'}, 
                                        {sectionName: 'Article Forms', sectionUrl: '/article/forms/list'},
                                        {sectionName: 'Community topics', sectionUrl:'#'},
                                        {sectionName: 'community posts', sectionUrl: '#'}]};
  secondarySidebarOptions : String[];
  
 updateSidebar(option){
   
  this.secondarySidebarOptions = this.primarySidebarOptions[option]
  console.log(this.secondarySidebarOptions)
 }
}
