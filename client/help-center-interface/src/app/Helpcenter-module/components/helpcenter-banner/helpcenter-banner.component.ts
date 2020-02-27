import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-helpcenter-banner',
  templateUrl: './helpcenter-banner.component.html',
  styleUrls: ['./helpcenter-banner.component.scss']
})
export class HelpcenterBannerComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Input() currentPage: string;

  search_hc_form = this.fb.group({
    search: ['']
  })
  ngOnInit() {
    console.log(this.currentPage);
    
  }

}
