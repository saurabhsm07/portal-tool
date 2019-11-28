import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KB article module';
  sidebarOptions = { articles : ['published', 'drafts','archived'],
                     community: ['topics', 'posts'],
                     settings : ['Articles', 'Article Fields', 'Article Forms', 'Community topics', 'community posts']};
  
 updateSidebar(option){
   console.log(option);
 }
}
