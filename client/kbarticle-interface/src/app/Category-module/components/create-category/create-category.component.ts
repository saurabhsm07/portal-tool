import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormBuilder } from '@angular/forms';
import {Router } from'@angular/router';

import { Category } from './../../classes/category'
import { CategoryService } from './../../services/category-service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
  }

  // reactive form to work with category object data
  category_form = this.fb.group({
    name: [''],
    description: [''],
    icon_file: ['']
  });

  // category object to be saved to the database
  category: Category;

  /**
   * Save Category object values as a record in the categories database
   */
  onSubmitForm(){
    console.log(this.category_form.value.name);

    const category : Category = {
                                  name: this.category_form.value.name,
                                  description: this.category_form.value.description,
                                  icon_url: this.category_form.value.icon_file,
                                  createdAt: new Date(),
                                  updatedAt: new Date(),
                                }
    this.categoryService.postCategory(category)
                        .subscribe((data) => {
                          console.log(data);
                          this.router.navigate(['/categories/home'])
                        },
                          (error) => {
                          console.log(error);
                          })
  }

}
