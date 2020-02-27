import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category-service/category.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories: Category[];   // List of Category objects
  public searchString = '';

  dataSource = new MatTableDataSource<Category>(); // datasource of type 'Category' for mat-table 
  displayedColumns: string[];     // saves column names of the article table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    }

  constructor(private categoryService: CategoryService,
              private route: Router) { }

  ngOnInit() {
    this.categoryService.listCategories()
                        .subscribe((data) =>{
                          console.log(data);
                          this.categories = data;

                         
                          this.displayedColumns = ['name', 'id', 'created_at', 'edit'];
                          this.dataSource.data = this.categories;
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.filter = this.searchString;
                        },
                        (error) =>{
                          console.log(error);
                        })
  }

  viewCategory(categoryId){
    this.route.navigate(['/guide/categories/id/'+categoryId])
  }

}
