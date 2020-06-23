import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-section-header-hc',
  templateUrl: './section-header-hc.component.html',
  styleUrls: ['./section-header-hc.component.scss']
})
export class SectionHeaderHcComponent implements OnInit {

constructor(private fb: FormBuilder, private router: Router) { }

public search_hc_form = this.fb.group({
  search: ['']
})

get searchString() { return this.search_hc_form.get('search').value}
  @Input() section_name: string;


  ngOnInit() {
  }

    /**
   * method searches hc content (articles) once searchbox form is submitted
   */
  public onSubmit(){
    // console.log(this.searchString)
    this.router.navigate(['hc/en-us/search'], {queryParams: {query: this.searchString, offset: 0}})
  }
}
