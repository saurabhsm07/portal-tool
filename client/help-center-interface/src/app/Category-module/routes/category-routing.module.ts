import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryHomeComponent } from './../components/category-home/category-home.component';
import { EditCategoryComponent } from './../components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './../components/create-category/create-category.component';

const routes: Routes = [
  { path: 'categories/home', component: CategoryHomeComponent },
  { path: 'categories/id/:id', component: EditCategoryComponent },
  { path: 'categories/create', component: CreateCategoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
