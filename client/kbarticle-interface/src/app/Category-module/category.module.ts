import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './routes/category-routing.module';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';


@NgModule({
  declarations: [CategoryHomeComponent, 
                 ListCategoriesComponent, 
                 EditCategoryComponent, 
                 CreateCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
