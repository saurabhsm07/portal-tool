import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { CustomValidators } from '../../../imports/custom-form-validators';
import { group } from '../../../../../node_modules/@angular/animations';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent implements OnInit {

  public passwordChangeForm = this.fb.group({
    currentPassword: ['', Validators.required],
    changeGroup: this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    },{validators: CustomValidators.matchPasswords}),
    
  })

  get currentPwd() {return this.passwordChangeForm.get('currentPassword');}
  get changePwdGroup() {return this.passwordChangeForm.get('changeGroup');}
  get newPwd() {return this.passwordChangeForm.get('changeGroup').get('newPassword');}
  get confirmPwd() {return this.passwordChangeForm.get('changeGroup').get('confirmPassword');}
  
  constructor(private fb : FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
  }

  public submitPasswordChangeReq(){
    this.userService.updateUserPassword({
                                          id: this.userService.getUserId(),
                                          currentPwd: this.currentPwd.value,
                                          newPwd: this.newPwd.value,
                                          confirmPwd: this.confirmPwd.value
                                        })
                    .subscribe((resp) => {
                      console.log(resp);
                    }, (error) => {
                      console.log("ERROR: \n" + error);
                    })
  }

  public currentPwdIsValid(){

    console.log("current password is invalid");
    return false;
  }

}
