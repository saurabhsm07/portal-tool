import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Category } from './../../classes/category';
import { CategoryService } from './../../services/category-service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  category$: Observable<Category>;  // observable to map category i.d from angular route path and call get category by id API
  category: Category                // category object to store category record field values
  
  // reactive form used to store values
  category_form = this.fb.group({
    name: [''],
    description: [''],
    icon_file: ['']
  })
  constructor(private router: Router,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private fb : FormBuilder) { }

  ngOnInit() {

    this.category$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.categoryService.getCategory(params.get('id')))
    );

    this.category$.subscribe((category) => {
                              this.category = category;
                              this.setCategoryFormValues();
                            },
                              (error) => {
                                console.log(error);
                              })
  }

  setCategoryFormValues() {
    this.category_form.setValue({
      name: this.category.name,
      description: this.category.description,
      icon_file: this.category.icon_url
    })
  }
  
  onSubmitForm(){
    this.category.name = this.category_form.value.name;
    this.category.description = this.category_form.value.description;
    this.category.icon_url = this.category_form.value.icon_file;

    this.categoryService.updateCategory(this.category)
                        .subscribe((data) => {
                          if(data.status == 200){
                            console.log(data.message);
                            this.router.navigate(['/categories/home'])
                          }
                          else{
                            console.log(data.message);
                          }
                        
                      },
                        (error) => {
                        console.log(error);
                        })
  }

}
