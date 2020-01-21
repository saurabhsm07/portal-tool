import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Segment } from './../../classes/segment';
import { SegmentService } from './../../services/segment-service/segment.service';
import { CustomValidators } from './../../../imports/custom-form-validators'


@Component({
  selector: 'app-edit-segment',
  templateUrl: './edit-segment.component.html',
  styleUrls: ['./edit-segment.component.scss']
})
export class EditSegmentComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  segment$: Observable<Segment>;     // observable to map segment i.d from angular route path and call get segment by id API
  userSegment: Segment;                  // segment object to store user segment record field values
  
   //user role type list
   user_type_list = [
    {value: 0, name: 'Signed-in User'},
    {value: 1, name: 'Staff'}
  ]
    // reactive form to work with segment object data
    segment_form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      user_type:[, [Validators.required]],
      organization_ids: [],
      group_ids: [],
      tags: [],
      or_tags: []
    });

  /**
   * Getter Functions to get name and category id
   */
  get name() { return this.segment_form.get('name'); }
  get organization_ids() {return this.segment_form.get('organization_ids');}
  get or_tags() {return this.segment_form.get('tags');}
  get tags() {return this.segment_form.get('or_tags');}
  get user_type() {return this.segment_form.get('user_type');}



    //dummy data values for organizations and tags
    private organizationList = [
      {id: 1, name: 'org-1'},
      {id: 2, name: 'org-2'},
      {id: 3, name: 'org-3'},
      {id: 4, name: 'org-4'},
      {id: 5, name: 'org-5'},
      {id: 6, name: 'org-6'},
      {id: 7, name: 'org-7'},
      {id: 8, name: 'org-8'},
      {id: 9, name: 'org-9'},
      {id: 10, name: 'org-10'},
    ]

    private tagList = [
      {id: 1, name: 'tag-1'},
      {id: 2, name: 'tag-2'},
      {id: 3, name: 'tag-3'},
      {id: 4, name: 'tag-4'},
      {id: 5, name: 'tag-5'},
      {id: 6, name: 'tag-6'},
      {id: 7, name: 'tag-7'},
      {id: 8, name: 'tag-8'},
      {id: 9, name: 'tag-9'},
      {id: 10, name: 'tag-10'},
    ]

  constructor(private fb: FormBuilder,
              private segmentService: SegmentService,
              private router: Router,
              private route: ActivatedRoute) { }

              ngOnInit() {

                this.segment$ = this.route.paramMap.pipe(
                  switchMap((params: ParamMap) =>
                    this.segmentService.getSegment(params.get('id')))
                );
            
                this.segment$.subscribe((segment) => {
                                          this.userSegment = segment;
                                          console.log(this.userSegment)
                                          this.setSegmentFormValues();
                                        },
                                          (error) => {
                                            console.log(error);
                                          })
              }

                            
              /**
               * set values of the edit segment form
               */
              setSegmentFormValues() {
                this.segment_form.setValue({
                  name: this.userSegment.name,
                  user_type: this.userSegment.user_type.toString(),
                  organization_ids: this.userSegment.organization_ids,
                  tags: this.userSegment.tags,
                  or_tags: this.userSegment.or_tags,
                  group_ids: this.userSegment.group_ids
                })

                console.log(this.segment_form.value)
              }

              /**
               *  preprocess and submit the edited changes in segment object to update segment service 
               */
              onSubmitForm(){
                this.userSegment = {
                  id: this.userSegment.id,
                  name: this.segment_form.value.name,
                  user_type: this.segment_form.value.user_type,
                  organization_ids: JSON.stringify(this.segment_form.value.organization_ids),
                  tags: JSON.stringify(this.segment_form.value.tags),
                  or_tags: JSON.stringify(this.segment_form.value.or_tags),
                  group_ids: JSON.stringify(this.segment_form.value.group_ids),
                  updated_at: new Date(Date.now())
                }
            
                this.segmentService.updateSegment(this.userSegment)
                                    .subscribe((data) => {
                                      if(data.status == 200){
                                        console.log(data.message);
                                        this.router.navigate(['/segments/home'])
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
