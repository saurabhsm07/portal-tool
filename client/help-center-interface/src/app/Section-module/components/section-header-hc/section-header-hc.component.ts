import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-header-hc',
  templateUrl: './section-header-hc.component.html',
  styleUrls: ['./section-header-hc.component.scss']
})
export class SectionHeaderHcComponent implements OnInit {

  @Input() section_name: string;
  constructor() { }

  ngOnInit() {
  }

}
