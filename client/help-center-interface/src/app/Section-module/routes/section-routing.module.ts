import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionHomeComponent } from './../components/section-home/section-home.component';
import { CreateSectionComponent } from './../components/create-section/create-section.component';
import { EditSectionComponent } from './../components/edit-section/edit-section.component';
import { ViewSectionHcComponent } from './../components/view-section-hc/view-section-hc.component';

const routes: Routes = [
  { path: 'sections/home', component: SectionHomeComponent },
  { path: 'sections/create', component: CreateSectionComponent},
  { path: 'sections/id/:id', component: EditSectionComponent},
  { path: 'hc/en-us/sections/id/:id', component: ViewSectionHcComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
