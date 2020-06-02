import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-helpcenter-banner',
  templateUrl: './helpcenter-banner.component.html',
  styleUrls: ['./helpcenter-banner.component.scss']
})
export class HelpcenterBannerComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  @Input() currentPage: string;

  public search_hc_form = this.fb.group({
    search: ['']
  })
  
  get searchString() { return this.search_hc_form.get('search').value}
  ngOnInit() {
    console.log(this.currentPage);
    
  }

  public onSubmit(){
    // console.log(this.searchString)
    this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString}})
  }

}
