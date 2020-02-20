import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-helpcenter-header',
  templateUrl: './helpcenter-header.component.html',
  styleUrls: ['./helpcenter-header.component.scss']
})
export class HelpcenterHeaderComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  search_hc_form = this.fb.group({
    search: ['']
  })
  ngOnInit() {
  }

}
