import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user-service/user.service';
import { User } from './../../classes/user';
@Component({
  selector: 'app-helpcenter-home',
  templateUrl: './helpcenter-home.component.html',
  styleUrls: ['./helpcenter-home.component.scss']
})
export class HelpcenterHomeComponent implements OnInit {

  @ViewChild('loginLink', { static: false }) loginLink: ElementRef;
  @ViewChild('registerLink', { static: false }) registerLink: ElementRef;

  public loginMode = true;

  private userObj: User;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }


  //Reactive login form
  login_form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  //Reactive register form
  register_form = this.fb.group({
    full_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    phone_number: ['', [Validators.required]]
  });

  //Getters login form
  get login_email() { return this.login_form.get('email'); }
  get login_password() { return this.login_form.get('password'); }

  //Getters register form
  get name() { return this.register_form.get('full_name'); }
  get email() { return this.register_form.get('email'); }
  get password() { return this.register_form.get('password'); }
  get confirm_password() { return this.register_form.get('confirm_password') };
  get phone_number() { return this.register_form.get('phone_number'); }



  ngOnInit() {
  }

  public toggleMode(type: string) {
    console.log(type)
    if (type == 'login') {
      this.loginMode = true;
      this.loginLink.nativeElement.src = './assets/images/loginblueicon.svg';
      this.registerLink.nativeElement.src = './assets/images/registergreyicon.svg'
    }

    else {
      this.loginMode = false;
      this.loginLink.nativeElement.src = './assets/images/registergreyicon.svg';
      this.registerLink.nativeElement.src = './assets/images/registerblueicon.svg'
    }

  }

  public registerFormSubmit() {

    this.userService.registerUser({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.password.value
    }).subscribe((user) => {
      this.iniHcData(user);
      console.log(this.userObj)
    }, (error) => {
      console.log(error);
    })
  }

  public loginFormSubmit() {
    console.log(this.login_email.value)
    this.userService
        .loginUser({ email: this.login_email.value, 
                      password: this.login_password.value })
        .subscribe((user) => {
          this.iniHcData(user);
          console.log(this.userObj);
        })
  }
  /**
   * 
   * @param user : user object recieved from the database
   */
  private iniHcData(user: User) {
    this.userObj = user
    let token = user.remember_token;
  }
}