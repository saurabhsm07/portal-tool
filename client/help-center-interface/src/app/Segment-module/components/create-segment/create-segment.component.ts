import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormBuilder, Validators } from '@angular/forms';
import {Router } from'@angular/router';

import { Segment } from './../../classes/segment';
import { Organization } from './../../classes/organization';
import { Tag } from './../../classes/tag';
import { SegmentService } from './../../services/segment-service/segment.service';
import { OrganizationService } from './../../services/organization-service/organization.service';
import { TagService } from './../../services/tag-service/tag.service';

import {take, takeUntil } from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';
import { MatSelect } from '@angular/material/';
@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.scss']
})
export class CreateSegmentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  userSegment: Segment; //User segment object to save input values and to be stored in the database;

  //user role type list
  user_type_list = [
    {value: 0, name: 'Signed-in User'},
    {value: 1, name: 'Staff'}
  ]
    // reactive form to work with section object data
    segment_form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      user_type:['', [Validators.required]],
      organization_ids: [],
      group_ids: [],
      tags: [[]],
      or_tags: []
    });

  /**
   * Getter Functions to get name and category id
   */
  get name() { return this.segment_form.get('name'); }
  get organization_ids() {return this.segment_form.get('organization_ids');}
  get tags() {return this.segment_form.get('tags');}
  get or_tags() {return this.segment_form.get('or_tags');}
  get user_type() {return this.segment_form.get('user_type');}



    //dummy data values for organizations and tags
    private organizationList : Organization[];

    private tagList : Tag[];

  
    //multiselect with 
      /** list of banks */


  /** control for the selected bank for multi-selection */

  /** control for the MatSelect filter keyword multi-selection */
  public tagsMultiFilterControl = this.fb.control([]);

  /** list of banks filtered by search keyword */
  public filteredTagsMulti: ReplaySubject<Tag[]> = new ReplaySubject<Tag[]>(1);

  @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private fb: FormBuilder,
              private segmentService: SegmentService,
              private organizationService: OrganizationService,
              private tagService: TagService,
              private router: Router) { }

  ngOnInit() {

        // load the initial bank list
    
    this.tagService.listTags()
                    .subscribe((tagData) =>{
                        console.log(tagData);
                        this.tagList = tagData;
                        this.filteredTagsMulti.next(this.tagList.slice());
                    }, (error) => {
                      console.log(error)
                    })

    this.organizationService.listOrganizations()
                              .subscribe((organizations) => {
                                this.organizationList = organizations;
                              }, (error) => {
                                console.log(error);
                              })
        
     // listen for search field value changes
     this.tagsMultiFilterControl.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(() => {
       console.log("yeye")
       console.log(this.tags.value)
       this.filterTagsMulti();
     });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

    /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    console.log("initial value")
    this.filteredTagsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        console.log("yes i an here")
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Tag, b: Tag) => a && b && a.id === b.id;

      console.log(this.tags.value)
      });
  }

  protected filterTagsMulti() {
    if (!this.tagList) {
      return;
    }
    // get the search keyword
    let search = this.tagsMultiFilterControl.value;
    if (search.length == 0) {
      this.filteredTagsMulti.next(this.tagList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTagsMulti.next(
      this.tagList.filter(tag => tag.tag_name.toLowerCase().indexOf(search) > -1)
    );
  }

   /**
     * Save User Segment object values as a record in the categories database
     */
  onSubmit(){
    console.log(this.segment_form.value);

    this.userSegment = {
      name: this.segment_form.value.name,
      user_type: this.segment_form.value.user_type,
      organization_ids: JSON.stringify(this.segment_form.value.organization_ids),
      tags: JSON.stringify(this.segment_form.value.tags),
      or_tags: JSON.stringify(this.segment_form.value.or_tags),
      group_ids: JSON.stringify(this.segment_form.value.group_ids),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }

    this.segmentService.postSegment(this.userSegment)
                       .subscribe((segment) => {
                         console.log(segment);
                         this.router.navigate(['/segments/home']);
                       }, (error) => {
                         console.log(error);
                       })
  }

}
