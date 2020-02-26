import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedAccessComponent } from './../components/unauthorized-access/unauthorized-access.component';
const routes: Routes = [
  { path: 'guide/unauthorized/access', component: UnauthorizedAccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
