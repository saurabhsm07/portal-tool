import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-article-header-hc',
  templateUrl: './article-header-hc.component.html',
  styleUrls: ['./article-header-hc.component.scss']
})
export class ArticleHeaderHcComponent implements OnInit {

  @Input() section_name: string;
  constructor(private fb: FormBuilder, private router: Router) { }

  public search_hc_form = this.fb.group({
    search: ['']
  })
  get searchString() { return this.search_hc_form.get('search').value}

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
