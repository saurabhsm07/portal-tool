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

  /**
   * click search method to fetch hc data (articles) based on topic clicked
   * @param searchTerm the term clicked to search accross helpcenter
   */
  public searchHelpcenter(searchTerm){
    this.router.navigate(['hc/en-us/search'], {queryParams: {query: searchTerm, offset: 0}})
  }

  /**
   * method searches hc content (articles) once searchbox form is submitted
   */
  public onSubmit(){
    // console.log(this.searchString)
    this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString, offset: 0}})
  }

}
