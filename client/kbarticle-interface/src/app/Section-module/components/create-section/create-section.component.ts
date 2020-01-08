import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormBuilder, Validators } from '@angular/forms';
import {Router } from'@angular/router';

import { Section } from './../../classes/section'
import { SectionService } from './../../services/section-service/section.service';
import { CategoryService } from './../../../Category-module/services/category-service/category.service';
import { Category } from './../../../Category-module/classes/category';
import { CustomValidators } from './../../../imports/custom-form-validators';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  categoryList : Category[];
  sectionList : Section[];
  selectedCategoryId :  Number;
  
  constructor(private fb: FormBuilder,
              private sectionService: SectionService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.categoryService.listCategories()
    .subscribe((data) =>{
      this.categoryList = data;

    },
    (error) =>{
      console.log(error);
    })
  }

  // reactive form to work with section object data
  section_form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10)]],
    description: [''],
    category_id: ['', [Validators.required, CustomValidators.forbiddenNullValueSelect]],
    parent_section_id: [''],
  });

    /**
   * Getter Functions to get name and category id
   */
  get name() { return this.section_form.get('name'); }
  get category_id() {return this.section_form.get('category_id')}


    // section object to be saved to the database
    section: Section;

    /**
     * Save Section object values as a record in the categories database
     */
    onSubmitForm(){
      console.log(this.section_form.value);
  
      const section : Section = {
                                    name: this.section_form.value.name,
                                    description: this.section_form.value.description,
                                    category_id: parseInt(this.section_form.value.category_id),
                                    parent_section_id: this.section_form.value.parent_section_id,
                                    created_at: new Date(Date.now()),
                                    updated_at: new Date(Date.now()),
                                  }
      this.sectionService.postSection(section)
                          .subscribe((data) => {
                            console.log(data);
                            this.router.navigate(['/sections/home']);
                          },
                            (error) => {
                            console.log(error);
                            })
    }

    /**
     * Get all sections from the selected category id
     */
    getSectionsInCategory(){
      if(this.selectedCategoryId == 0){
        this.sectionList = [];
      }
      else{
        this.sectionService.getSectionInCategory(this.selectedCategoryId.toString())
        .subscribe((data) => {
          console.log(data);
          this.sectionList = data;
        },
        (error) => {
          if(error.status == 404){
            this.sectionList = null;
            console.log("in sections")
          }
          else{
            console.log(error);
          }
          
        })
      }

    }
}
