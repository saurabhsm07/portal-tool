import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './routes/category-routing.module';
import { CategoryHomeComponent } from './components/category-home/category-home.component';


@NgModule({
  declarations: [CategoryHomeComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
