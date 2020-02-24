import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from './../../classes/user';

@Component({
  selector: 'app-helpcenter-header',
  templateUrl: './helpcenter-header.component.html',
  styleUrls: ['./helpcenter-header.component.scss']
})
export class HelpcenterHeaderComponent implements OnInit, AfterViewInit {

  @Input() user: User;
  @ViewChild('loginBtnLink', { static: false }) loginBtnLink: ElementRef;

  constructor(private fb: FormBuilder) { }

  search_hc_form = this.fb.group({
    search: ['']
  })
  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.openLoginModal()
    
  }
    
  public openLoginModal(){
    if(this.user == undefined){
      this.loginBtnLink.nativeElement.click();
    }
   
  }

}
