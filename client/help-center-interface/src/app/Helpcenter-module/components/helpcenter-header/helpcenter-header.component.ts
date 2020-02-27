import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../classes/user';
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

  public loginMode = true;
  public authenticating = false;
  public userObj: User;
  public isAgent = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

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
  get confirm_password() { return this.register_form.get('confirm_password') }
  get phone_number() { return this.register_form.get('phone_number'); }



  ngOnInit() {

    this.checkIfLoggedIn();

    this.authService.isAgent().subscribe((status) => {
      this.isAgent = status;
    }, (error) => {
      this.isAgent = false;
      console.log(error);
    })
  }

  public checkIfLoggedIn() {
    this.userObj = JSON.parse(localStorage.getItem('user'));
    if (this.userObj) {
      console.log("user logged in");
    }
  }

  ngAfterViewInit(): void {

    this.openLoginModal()

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
    }, (error) => {
      console.log(error);
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
        this.router.navigate(['/hc/en-us/home'])
      }, (error) => {
        console.log("in error")
        this.authenticating = false;
        console.log(error);
      })
  }


  /**
   * @param user : user object recieved from the database
   */
  public iniHcData(user: User) {
    this.userObj = user;
    localStorage.setItem('token', user.remember_token);
    localStorage.setItem('user', JSON.stringify(this.userObj));
  }
}
