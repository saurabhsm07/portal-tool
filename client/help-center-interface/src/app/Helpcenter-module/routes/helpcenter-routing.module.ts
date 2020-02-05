import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpcenterHomeComponent } from './../components/helpcenter-home/helpcenter-home.component';

const routes: Routes = [
  { path: 'hc/home', component: HelpcenterHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpcenterRoutingModule { }
