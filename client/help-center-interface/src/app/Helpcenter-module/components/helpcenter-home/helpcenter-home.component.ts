import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-helpcenter-home',
  templateUrl: './helpcenter-home.component.html',
  styleUrls: ['./helpcenter-home.component.scss']
})
export class HelpcenterHomeComponent implements OnInit {

  @ViewChild('loginLink', {static: false}) loginLink: ElementRef;
  @ViewChild('registerLink', {static: false}) registerLink: ElementRef;
  public loginMode = true;

  constructor() { }

  ngOnInit() {
  }

  public toggleMode(type: string){
    console.log(type)
    if(type == 'login'){
      this.loginMode = true;
      this.loginLink.nativeElement.src = './assets/images/loginblueicon.svg';
      this.registerLink.nativeElement.src = './assets/images/registergreyicon.svg'
    }
      
      else{
        this.loginMode = false;
        this.loginLink.nativeElement.src = './assets/images/registergreyicon.svg';
        this.registerLink.nativeElement.src = './assets/images/registerblueicon.svg'
      }
  
  }
}
