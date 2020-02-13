import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-category-header-hc',
  templateUrl: './category-header-hc.component.html',
  styleUrls: ['./category-header-hc.component.scss']
})
export class CategoryHeaderHcComponent implements OnInit {

  @Input() category_name: string;

  constructor() { }

  ngOnInit() {
    console.log(this.category_name)
  }

}
