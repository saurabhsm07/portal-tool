import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Segment } from './../../classes/segment';
import { Organization } from './../../classes/organization';
import { Tag } from './../../classes/tag';
import { SegmentService } from './../../services/segment-service/segment.service';
import { OrganizationService } from './../../services/organization-service/organization.service';
import { TagService } from './../../services/tag-service/tag.service';

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
    private organizationList : Organization[];

    private tagList : Tag[];




  constructor(private fb: FormBuilder,
              private segmentService: SegmentService,
              private organizationService: OrganizationService,
              private tagService: TagService,
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
                
                this.tagService.listTags()
                .subscribe((tags) =>{
                    this.tagList = tags;
                }, (error) => {
                  console.log(error)
                })
            
                this.organizationService.listOrganizations()
                                          .subscribe((organizations) => {
                                            this.organizationList = organizations;
                                          }, (error) => {
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
