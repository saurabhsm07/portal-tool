import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpcenterHomeComponent } from '../components/helpcenter-home/helpcenter-home.component';
import { ComponentNotFoundComponent } from '../components/component-not-found/component-not-found.component';
import { HelpcenterLogoutComponent } from '../components/helpcenter-logout/helpcenter-logout.component';
import { HelpcenterSearchComponent} from '../components/helpcenter-search/helpcenter-search.component';
const routes: Routes = [
  {path: 'hc/en-us/home', component: HelpcenterHomeComponent},
  {path: 'home', redirectTo: '/hc/en-us/home', pathMatch: 'full'},
  {path: '', redirectTo: '/hc/en-us/home', pathMatch: 'full'},
  {path: 'hc/en-us/search', component: HelpcenterSearchComponent},
  {path: 'hc/en-us/logout', component: HelpcenterLogoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpcenterRoutingModule { }
