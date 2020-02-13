import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-header-hc',
  templateUrl: './article-header-hc.component.html',
  styleUrls: ['./article-header-hc.component.scss']
})
export class ArticleHeaderHcComponent implements OnInit {

  @Input() section_name: string;
  constructor() { }

  ngOnInit() {
  }

}
