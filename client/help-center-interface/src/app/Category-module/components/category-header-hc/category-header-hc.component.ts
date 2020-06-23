import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-category-header-hc',
  templateUrl: './category-header-hc.component.html',
  styleUrls: ['./category-header-hc.component.scss']
})
export class CategoryHeaderHcComponent implements OnInit {

  @Input() category_name: string;

  public search_hc_form = this.fb.group({
    search: ['']
  })

  get searchString() { return this.search_hc_form.get('search').value }


  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    console.log(this.category_name)
  }

  /**
 * method searches hc content (articles) once searchbox form is submitted
 */
  public onSubmit() {
    // console.log(this.searchString)
    this.router.navigate(['hc/en-us/search'], { queryParams: { query: this.searchString, offset: 0 } })
  }

}
