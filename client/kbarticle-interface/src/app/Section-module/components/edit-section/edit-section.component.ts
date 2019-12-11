import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Section } from './../../classes/section';
import { SectionService } from './../../services/section-service/section.service';
import { Category } from './../../../Category-module/classes/category';
import { CategoryService } from './../../../Category-module/services/category-service/category.service';

// import { } from './../../../'

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  section$: Observable<Section>;     // observable to map section i.d from angular route path and call get section by id API
  section: Section;                  // section object to store section record field values
  sectionList: Section[];            // list of sections for the parent section dropdown
  categoryList: Category[];          // list of categories
  selectedCategoryId: Number;
  
  // reactive form used to store values
  section_form = this.fb.group({
    name: [''],
    description: [''],
    category_id: [''],
    parent_section_id: [''],
  })

  constructor(private router: Router,
              private sectionService: SectionService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private fb : FormBuilder) { }

              ngOnInit() {

                this.section$ = this.route.paramMap.pipe(
                  switchMap((params: ParamMap) =>
                    this.sectionService.getSection(params.get('id')))
                );
            
                this.section$.subscribe((section) => {
                                          this.section = section;
                                          this.selectedCategoryId = section.category_id
                                          this.fetchCategories();
                                        },
                                          (error) => {
                                            console.log(error);
                                          })
              }
              
              /**
               * set values of the edit section form
               */
              setSectionFormValues() {
                this.section_form.setValue({
                  name: this.section.name,
                  description: this.section.description,
                  category_id: this.section.category_id,
                  parent_section_id: this.section.parent_section_id
                })
              }

              /**
               * fetch all categories from the database
               */
              fetchCategories(){
                this.categoryService.listCategories()
                .subscribe((data) =>{
                  this.categoryList = data;
                  this.getSectionsInCategory();
                },
                (error) =>{
                  console.log(error);
                })
                
              }

                 /**
                 * Get all sections from the selected category id
                 */
                getSectionsInCategory(){
                  this.sectionService.getSectionInCategory(this.selectedCategoryId.toString())
                                      .subscribe((data) => {
                                        this.setSectionFormValues();
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
              
              /**
               * 
               */
              onSubmitForm(){
                this.section.name = this.section_form.value.name;
                this.section.description = this.section_form.value.description;
            
                this.sectionService.updateSection(this.section)
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
