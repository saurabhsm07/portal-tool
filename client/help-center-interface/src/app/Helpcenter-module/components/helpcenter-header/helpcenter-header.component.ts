import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user-service/user.service';
import { FormService } from './../../../Tickets-module/services/ticket-forms-service/form.service';
import { AuthService } from '../../services/auth-service/auth.service';

import { User } from '../../classes/user';
import { Form } from './../../../Tickets-module/classes/form';
import { CustomValidators } from './../../../imports/custom-form-validators';
@Component({
  selector: 'app-helpcenter-header',
  templateUrl: './helpcenter-header.component.html',
  styleUrls: ['./helpcenter-header.component.scss']
})
export class HelpcenterHeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('loginBtnLink', { static: false }) loginBtnLink: ElementRef;
  
  @ViewChild('loginLink', { static: false }) loginLink: ElementRef;
  @ViewChild('registerLink', { static: false }) registerLink: ElementRef;
  @ViewChild('modalCancelBtn', { static: false }) modalCancelBtn: ElementRef;
  @ViewChild('modalCancelBtnR', { static: false }) modalCancelBtnR: ElementRef;
  

  public loginMode = true;
  public authenticating = false;
  public authenticationError = false;
  public registrationError = false;

  public userObj: User;
  public isAgent = false;

  public ticketForms: Form[];

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private ticketFormService: FormService,
    private router: Router,
    private authService: AuthService) { }

      //Reactive login form
  login_form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  //Reactive register form
  register_form = this.fb.group({
    full_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password_group: this.fb.group({
      password: ['', [Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]],
    },  {validators: CustomValidators.valueMatch} ),
    phone_number: ['', [Validators.required]]
  });

  //Getters login form
  get login_email() { return this.login_form.get('email'); }
  get login_password() { return this.login_form.get('password'); }

  //Getters register form
  get name() { return this.register_form.get('full_name'); }
  get email() { return this.register_form.get('email'); }
  get password_group() { return this.register_form.get('password_group');}
  get password() { return this.register_form.get('password_group').get('password'); }
  get confirm_password() { return this.register_form.get('password_group').get('confirm_password') }

  get phone_number() { return this.register_form.get('phone_number'); }
  



  ngOnInit() {

    this.checkIfLoggedIn();

    this.checkIfAgent();
  }

  private checkIfAgent() {
    this.authService.isAgent().subscribe((status) => {
      this.isAgent = status;
    }, (error) => {
      this.isAgent = false;
      console.log(error);
    });
  }

  public checkIfLoggedIn() {
    this.authService.tokenIsValid().subscribe((status) => {
      console.log(status);
      this.userObj = JSON.parse(localStorage.getItem('user'))
    }, (error) => {
      console.log(error);
      this.authService.removeAuthTokens;
      this.openLoginModal()
      this.router.navigate(['/']);
    })
  }

  ngAfterViewInit(): void {

    

  }

  public openLoginModal() {
    if (this.userObj == undefined) {
      this.loginBtnLink.nativeElement.click();
    }
  }

  public logoutUser() {
    this.authService.logoutUser().subscribe((data) => {
      if (data.logoutStatus == true) {
        const logoutStatus = this.authService.removeAuthTokens();
        if (logoutStatus) {
          console.log("signout successfull");
          this.router.navigate(['hc/en-us/logout']);
          // window.location.reload();
        }
      }
    }, (error) => {
      console.log(error);
    })
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

    this.authService.registerUser({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.password.value
    }).subscribe((user) => {
      this.iniHcData(user);
      this.modalCancelBtnR.nativeElement.click();
      this.checkIfAgent();
      
    }, (error) => {
      console.log(error);
      this.registrationError = true;
    })
  }

  public loginFormSubmit() {
    this.authenticating = true;
    this.authService
      .loginUser({
        email: this.login_email.value,
        password: this.login_password.value
      })
      .subscribe((user) => {
        this.iniHcData(user);
        this.authenticating = false;
        this.modalCancelBtn.nativeElement.click();
        this.checkIfLoggedIn();
        this.checkIfAgent();
      }, (error) => {
        console.log("in error")
        this.authenticating = false;
        this.authenticationError = true;
        console.log(error);
      })
  }

  /**
   * Fetch product ticket forms for the perticular user 
   */
  public fetchFormData() {
    this.ticketFormService.listForms()
                          .subscribe((data) => {
                            this.ticketForms = data;
                            console.log(this.ticketForms);
                          }, (error) => {
                            console.log(error);
                          })
  }

  /**
   * @param user : user object recieved from the database
   */
  public iniHcData(user: User) {
    this.userObj = user;
    console.log(this.userObj);
    // console.log(this.userObj.remember_token);
    localStorage.setItem('token', this.userObj.remember_token);
    localStorage.setItem('user', JSON.stringify(this.userObj));
  }
}
