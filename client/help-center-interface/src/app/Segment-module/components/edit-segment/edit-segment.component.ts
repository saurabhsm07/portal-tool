import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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

import {take, takeUntil } from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';
import { MatSelect } from '@angular/material';
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
  get or_tags() {return this.segment_form.get('or_tags');}
  get tags() {return this.segment_form.get('tags');}
  get user_type() {return this.segment_form.get('user_type');}

    //dummy data values for organizations and tags
    private organizationList : Organization[];

    private tagList : Tag[];


  /** control for the selected bank for multi-selection */

  /** control for the MatSelect filter keyword multi-selection */
  public andTagsMultiFilterControl = this.fb.control([]);
  public orTagsMultiFilterControl  = this.fb.control([]);
  public organizationMultiFilterControl = this.fb.control([]);

  /** list of banks filtered by search keyword */
  public filteredTagsMultiAnd: ReplaySubject<Tag[]> = new ReplaySubject<Tag[]>(1);
  public filteredTagsMultiOr: ReplaySubject<Tag[]> = new ReplaySubject<Tag[]>(2);
  public filteredOrgsMulti: ReplaySubject<Organization[]> = new ReplaySubject<Organization[]>(1);

  @ViewChild('multiSelectAndTag', { static: false }) multiSelectAndTag: MatSelect;
  @ViewChild('multiSelectOrTag', { static: false }) multiSelectOrTag: MatSelect;
  @ViewChild('multiSelectOrganization', { static: false }) multiSelectOrganization: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();




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
                .subscribe((tagData) =>{
                    this.tagList = tagData;
                    this.filteredTagsMultiAnd.next(this.tagList.slice());
                    this.filteredTagsMultiOr.next(this.tagList.slice());
                    this.setInitialValueTagFilters();
                }, (error) => {
                  console.log(error)
                })
            
                this.organizationService.listOrganizations()
                                          .subscribe((organizations) => {
                                            this.organizationList = organizations;
                                            this.filteredOrgsMulti.next(this.organizationList.slice());
                                            this.setInitialValueOrganizationFilters();
                                          }, (error) => {
                                            console.log(error);
                                          })

                                               // listen for search field value changes
                      this.andTagsMultiFilterControl.valueChanges
                      .pipe(takeUntil(this._onDestroy))
                      .subscribe(() => {
                        this.filterTagsMultiAnd();
                      });

                        // listen for search field value changes
                        this.orTagsMultiFilterControl.valueChanges
                        .pipe(takeUntil(this._onDestroy))
                        .subscribe(() => {
                        this.filterTagsMultiOr();
                        });

                        
                        this.organizationMultiFilterControl.valueChanges
                        .pipe(takeUntil(this._onDestroy))
                        .subscribe(() => {
                        this.filterOrganizationsMulti();
                        });
                          
              }

              ngAfterViewInit() {
                console.log("after view init")
              }
            
              ngOnDestroy() {
                this._onDestroy.next();
                this._onDestroy.complete();
              }
            
                /**
               * Sets the initial value after the filteredBanks are loaded initially
               */
              protected setInitialValueTagFilters() {
                console.log("initial value")
                this.filteredTagsMultiAnd
                    .pipe(take(1), takeUntil(this._onDestroy))
                    .subscribe(() => {
                      this.multiSelectAndTag.compareWith = (a: Tag, b: Tag) => a && b && a.id === b.id;
                    });
            
                this.filteredTagsMultiOr
                    .pipe(take(2), takeUntil(this._onDestroy))
                    .subscribe(() => {
                      this.multiSelectOrTag.compareWith = (a: Tag, b: Tag) => a && b && a.id === b.id;
                    });
              }
            
              protected setInitialValueOrganizationFilters() {
                console.log("initial value")
                this.filteredOrgsMulti
                    .pipe(take(1), takeUntil(this._onDestroy))
                    .subscribe(() => {
                      this.multiSelectOrganization.compareWith = (a: Tag, b: Tag) => a && b && a.id === b.id;
                    });
            
              }
            
              protected filterTagsMultiAnd() {
                if (!this.tagList) {
                  return;
                }
                // get the search keyword
                let search = this.andTagsMultiFilterControl.value;
                if (search.length == 0) {
                  this.filteredTagsMultiAnd.next(this.tagList.slice());
                  return;
                } else {
                  search = search.toLowerCase();
                }
                // filter the banks
                this.filteredTagsMultiAnd.next(
                  this.tagList.filter(tag => tag.tag_name.toLowerCase().indexOf(search) > -1)
                );
              }
            
              protected filterTagsMultiOr() {
                if (!this.tagList) {
                  return;
                }
                // get the search keyword
                let search = this.orTagsMultiFilterControl.value;
                if (search.length == 0) {
                  this.filteredTagsMultiOr.next(this.tagList.slice());
                  return;
                } else {
                  search = search.toLowerCase();
                }
                // filter the banks
                this.filteredTagsMultiOr.next(
                  this.tagList.filter(tag => tag.tag_name.toLowerCase().indexOf(search) > -1)
                );
              }
            
              protected filterOrganizationsMulti() {
                if (!this.organizationList) {
                  return;
                }
                // get the search keyword
                let search = this.organizationMultiFilterControl.value;
                if (search.length == 0) {
                  this.filteredOrgsMulti.next(this.organizationList.slice());
                  return;
                } else {
                  search = search.toLowerCase();
                }
                // filter the banks
                this.filteredOrgsMulti.next(
                  this.organizationList.filter(org => org.name.toLowerCase().indexOf(search) > -1)
                );
              }
            
                            
              /**
               * set values of the edit segment form
               */
              setSegmentFormValues() {
              
                  this.name.setValue(this.userSegment.name);
                  this.user_type.setValue(this.userSegment.user_type.toString());
                  this.organization_ids.setValue(this.userSegment.organization_ids);
                  this.or_tags.setValue(this.userSegment.or_tags);
                  this.tags.setValue(this.userSegment.tags);
                  // group_ids: (this.userSegment.group_ids);
                

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

              validate(){
                console.log(this.segment_form.value);
              }

}
