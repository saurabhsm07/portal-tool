import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionHomeComponent } from './../components/section-home/section-home.component';
import { CreateSectionComponent } from './../components/create-section/create-section.component';
import { EditSectionComponent } from './../components/edit-section/edit-section.component';

const routes: Routes = [
  { path: 'sections/home', component: SectionHomeComponent },
  { path: 'sections/create', component: CreateSectionComponent},
  { path: 'sections/edit', component: CreateSectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
