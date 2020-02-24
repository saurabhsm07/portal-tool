import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryHomeComponent } from './../components/category-home/category-home.component';
import { EditCategoryComponent } from './../components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './../components/create-category/create-category.component';
import { ViewCategoryHcComponent } from './../components/view-category-hc/view-category-hc.component';
import { AuthGuard } from './../../authentication/auth.guard';

const routes: Routes = [
  { path: 'categories/home', component: CategoryHomeComponent },
  { path: 'categories/id/:id', component: EditCategoryComponent },
  { path: 'categories/create', component: CreateCategoryComponent },
  { path: 'hc/en-us/categories/id/:id', component: ViewCategoryHcComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
