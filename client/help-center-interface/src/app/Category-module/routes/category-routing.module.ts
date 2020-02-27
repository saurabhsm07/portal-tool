import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryHomeComponent } from '../components/category-home/category-home.component';
import { EditCategoryComponent } from '../components/edit-category/edit-category.component';
import { CreateCategoryComponent } from '../components/create-category/create-category.component';
import { ViewCategoryHcComponent } from '../components/view-category-hc/view-category-hc.component';
import { AuthGuard } from '../../helpers/authentication/auth.guard';
import { AdminGuard } from '../../helpers/autherization/admin/admin.guard';
import { AgentGuard } from '../../helpers/autherization/agent/agent.guard'


const routes: Routes = [
  { path: 'guide/categories/home', component: CategoryHomeComponent ,  canActivate: [AuthGuard, AgentGuard]},
  { path: 'categories', redirectTo: 'guide/categories/home', pathMatch: 'full'},
  { path: 'guide/categories', redirectTo: 'guide/categories/home', pathMatch: 'full'},
  { path: 'categories/home', redirectTo: 'guide/categories/home', pathMatch: 'full'},

  { path: 'guide/categories/id/:id', component: EditCategoryComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'guide/categories/create', component: CreateCategoryComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'hc/en-us/categories/id/:id', component: ViewCategoryHcComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
