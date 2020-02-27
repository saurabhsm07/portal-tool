import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Segment } from '../../classes/segment';
import { Organization } from '../../classes/organization';
import { Tag } from '../../classes/tag';
import { SegmentService } from '../../services/segment-service/segment.service';
import { OrganizationService } from '../../services/organization-service/organization.service';
import { TagService } from '../../services/tag-service/tag.service';

import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.scss']
})
export class CreateSegmentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  userSegment: Segment; //User segment object to save input values and to be stored in the database;

  //user role type list
  user_type_list = [
    { value: 0, name: 'Signed-in User' },
    { value: 1, name: 'Staff' }
  ]
  // reactive form to work with section object data
  segment_form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10)]],
    user_type: ['', [Validators.required]],
    organization_ids: [],
    group_ids: [],
    tags: [[]],
    or_tags: []
  });

  /**
   * Getter Functions to get name and category id
   */
  get name() { return this.segment_form.get('name'); }
  get organization_ids() { return this.segment_form.get('organization_ids'); }
  get tags() { return this.segment_form.get('tags'); }
  get or_tags() { return this.segment_form.get('or_tags'); }
  get user_type() { return this.segment_form.get('user_type'); }



  //dummy data values for organizations and tags
  private organizationList: Organization[];

  private tagList: Tag[];




  /** control for the selected bank for multi-selection */

  /** control for the MatSelect filter keyword multi-selection */
  public andTagsMultiFilterControl = this.fb.control([]);
  public orTagsMultiFilterControl = this.fb.control([]);
  public organizationMultiFilterControl = this.fb.control([]);

  /** list of banks filtered by search keyword */
  public filteredTagsMultiAnd: ReplaySubject<Tag[]> = new ReplaySubject<Tag[]>(1);
  public filteredTagsMultiOr: ReplaySubject<Tag[]> = new ReplaySubject<Tag[]>(0);
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
    private router: Router) { }

  ngOnInit() {

    // load the initial bank list

    this.tagService.listTags()
      .subscribe((tagData) => {

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
      .pipe(take(0), takeUntil(this._onDestroy))
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

  /**
  *get a filtered set of tags (and condition) based on search string
  */
  protected filterTagsMultiAnd() {
    if (!this.tagList) {
      return;
    }
    // get the search keyword
    let search = this.andTagsMultiFilterControl.value;
    if (search.length == 0) {
      this.getFilteredAndTagList();

    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.getFiteredAndTagListWithSearch(search);
  }


  /**
    *get a filtered set of tags (or condition) based on search string
    */
  protected filterTagsMultiOr() {
    if (!this.tagList) {
      return;
    }
    // get the search keyword
    let search = this.orTagsMultiFilterControl.value;
    if (search.length == 0) {
      this.getFilteredOrTagList();

    }
    else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.getFilteredOrTagListWithSearch(search);
  }

  /**
   * Gets a subset of available tag values for selection
   *  based on the 'search' keyword and all the tags selected in other 'or tag' condition
   * @param search
   */
  private getFiteredAndTagListWithSearch(search: any) {
    this.filteredTagsMultiAnd.next(this.tagList.filter((tag) => {
      if ((tag.tag_name.toLowerCase().indexOf(search) > -1)) {
        if ((this.or_tags.value != null) && (this.or_tags.value.length > 0)) {
          if (this.or_tags.value.map(tag => tag.tag_name).indexOf(tag.tag_name) == -1)
            return tag;
        }
        else {
          return tag;
        }
      }
    }));
  }

  /**
   * Gets a subset of available tag values for selection
   *  based on the tags selected in other 'or tag' condition which i removed in this filter function
   *  
   */
  private getFilteredAndTagList() {
    this.filteredTagsMultiOr.next(this.tagList.filter((tag) => {
      if ((this.or_tags.value != null) && (this.or_tags.value.length > 0)) {
        if (this.or_tags.value.map(tag => tag.tag_name).indexOf(tag) == -1)
          return tag;
      }
      else {
        return tag;
      }
    }).slice());
  }

  /**
 * Gets a subset of available tag values for selection
 *  based on the 'search' keyword and all the tags selected in other 'and tag' condition
 * @param search
 */
  private getFilteredOrTagListWithSearch(search: string) {
    this.filteredTagsMultiOr.next(this.tagList.filter((tag) => {
      {
        if ((tag.tag_name.toLowerCase().indexOf(search) > -1)) {
          if ((this.tags.value != null) && (this.tags.value.length > 0)) {
            if (this.tags.value.map(tag => tag.tag_name).indexOf(tag.tag_name) == -1)
              return tag;
          }
          else {
            return tag;
          }
        }
      }
    }));
  }

  /**
  * Gets a subset of available tag values for selection
  *  based on the 'search' keyword and all the tags selected in other 'or tag' condition
  */
  private getFilteredOrTagList() {
    this.filteredTagsMultiOr.next(this.tagList.filter((tag) => {
      if ((this.tags.value != null) && (this.tags.value.length > 0)) {
        if (this.tags.value.map(tag => tag.tag_name).indexOf(tag) == -1)
          return tag;
      }
      else {
        return tag;
      }
    }).slice());
  }

  /**
  *get a filtered set of organizations based on search string
  */
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
    * Save User Segment object values as a record in the categories database
    */
  onSubmit() {
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
