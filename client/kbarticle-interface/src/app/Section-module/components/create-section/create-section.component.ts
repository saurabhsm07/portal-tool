import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormBuilder } from '@angular/forms';
import {Router } from'@angular/router';

import { Section } from './../../classes/section'
// import {  } from './../../services/sec/category.service';


@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
