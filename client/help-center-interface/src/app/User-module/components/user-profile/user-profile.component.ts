import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user-service/user.service';
import { OrganizationService } from '../../services/organization-service/organization.service';
import { User_Extra_Detail } from '../../class/user_extra_detail';
import { TimezoneAndLocation } from './../../../imports/time-location-data';
import { User_Detail } from '../../class/user_detail';
import { User } from '../../class/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profileInitStatus = false;
  public userProfileObj = {}   //empty object for storing user profile data

 public timezoneList = TimezoneAndLocation.timezoneListData();
 public geolocationList = TimezoneAndLocation.geolocationListData();

 public userProfileForm = this.fb.group({
   info: this.fb.group({
    name: ['', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur'}],
   }),
    
   details: this.fb.group({
      number: ['',{updateOn: 'blur'}]
   }),

   extra: this.fb.group({
     address:[,{validators: [Validators.required, Validators.minLength(10)],updateOn: 'blur'}],
     skype_id:[,{validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'}],
     twitter_id:[, {validators:[Validators.required, Validators.minLength(5)], updateOn: 'blur'}],
     facebook_id:[, {validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'}],
     timezone:[, {validators: [Validators.required], updateOn: 'change'}],
     geolocation:[, {validators: [Validators.required], updateOn: 'change'}],
    //  designation:[]
  })
 })
 
 public setProfileName(name: string){ this.userProfileForm.get('info').get('name').setValue(name)}

 public setProfileNumber(number: number){ this.userProfileForm.get('details').get('number').setValue(number)}

 public setProfileAddress(address: string){this.userProfileForm.get('extra').get('address').setValue(address)}
 public setProfileSkypeId(skype_id: string){ this.userProfileForm.get('extra').get('skype_id').setValue(skype_id)}
 public setProfileTwitterId(twitter_id: string){ this.userProfileForm.get('extra').get('twitter_id').setValue(twitter_id)}
 public setProfileFacebookId(facebook_id: string){ this.userProfileForm.get('extra').get('facebook_id').setValue(facebook_id)}
 public setProfileTimezone(timezone: string){ this.userProfileForm.get('extra').get('timezone').setValue(timezone)}
 public setProfileGeolocation(geolocation: string){ this.userProfileForm.get('extra').get('geolocation').setValue(geolocation)}


  constructor(private userService: UserService,
              private organizationService: OrganizationService,
              private fb: FormBuilder,
              private route: Router
              ) { }


  ngOnInit() {
    const userId = this.userService.getUserId();
   

    this.fetchUserData(userId);
    this.profileUpdateEventSubscribtion(userId);  
  }



  public fetchUserData(userId: number) {
    this.userService.getUser(userId).subscribe((data) => {
      const userObj = data.user;
      this.userProfileObj['created_at'] = userObj.created_at;
      this.userProfileObj['updated_at'] = userObj.updated_at;
      this.userProfileObj['last_login_at'] = userObj.last_login_at;
      this.userProfileObj['name'] = userObj.name;
      this.userProfileObj['profile_image'] = userObj.profile_image;

      const organizationIds = this.userService.getOrganizationIds();
      this.fetchUserOrganizationDetails(organizationIds);

    });
  }

  public fetchUserOrganizationDetails(organizationIds: number[]) {
    this.organizationService.getOrganizationByIds(organizationIds)
      .subscribe((userOrganizations) => {
        this.userProfileObj['organizationNames'] = userOrganizations.map((org) => {
          return org.name;
        });

        this.fetchUserDetails(this.userService.getUserId());
      }, (error) => {
        console.log('ERROR: \n' + error);
      });
  }

  public fetchUserDetails(userId: number) {
    this.userService.getUserDetails(userId)
      .subscribe((profileData) => {
        this.setUserProfileObject(profileData);
      }, (error) => {
        console.log('ERROR: \n' + error);
      });
  }

/**
 * 
 * @param profileData object with arrays containing user details, user extra details
 */
  public setUserProfileObject(profileData) {
    const { details, extraDetails } = profileData;

    this.userProfileObj['name'] = this.userService.getUserName();
  
    details.forEach(detail => {
      this.userProfileObj[detail.field_type] = {id: detail.id, value: detail.data_value};
    });
    extraDetails.forEach(detail => {
      this.userProfileObj[detail.field_key] = {id: detail.id, value: detail.field_value};
    });
    console.log(this.userProfileObj)
    this.setProfileFormValues();
    
  }

  public setProfileFormValues() {
    this.setProfileName(this.userProfileObj['name']);
    if (this.userProfileObj['number'] != undefined) {
      this.setProfileNumber(this.userProfileObj['number'].value);
    }
    if (this.userProfileObj['address'] != undefined) {
      this.setProfileAddress(this.userProfileObj['address'].value);
    }
    if (this.userProfileObj['timezone'] != undefined) {
      this.setProfileTimezone(this.userProfileObj['timezone'].value);
    }
    if (this.userProfileObj['geolocation'] != undefined) {
      this.setProfileGeolocation(this.userProfileObj['geolocation'].value);
    }
    if (this.userProfileObj['skype_id'] != undefined) {
      this.setProfileSkypeId(this.userProfileObj['skype_id'].value);
    }
    if (this.userProfileObj['facebook_id'] != undefined) {
      this.setProfileFacebookId(this.userProfileObj['facebook_id'].value);
    }
    if (this.userProfileObj['skype_id'] != undefined) {
      this.setProfileTwitterId(this.userProfileObj['twitter_id'].value);
    }
    console.log(this.userProfileForm.value)
  this.updateProfileInitStatus(true);
  }

  public getProfileEmail(){
    return this.userProfileObj['email'].value;
  }

  public getProfileCreatedAt(){
    return this.userProfileObj['created_at'];
  }

  public getProfileOrganization(){
    return this.userProfileObj['organizationNames'];
  }

  public updateProfileImage(profileImageObj: FileList){
    
    this.userService.updateUserProfilePicture(profileImageObj, this.userService.getUserId())
                    .subscribe((resp) => {
                      console.log(resp);
                      window.location.reload();
                    },(error) => {
                      console.log('ERROR: \n'+ error);
                    })
  }
  public profileUpdateEventSubscribtion(userId) {
    this.userProfileForm.valueChanges.subscribe(() => {

      if (this.userProfileForm.get('info').dirty == true) {
        const fieldKeys = Object.keys(this.userProfileForm.get('info').value);
        fieldKeys.forEach((key) => {
          if(this.userProfileObj[key]!= undefined){
            if ((this.userProfileForm.get('info').get(key).valid) &&
            (this.userProfileForm.get('info').get(key).value != this.userProfileObj[key])) {
            this.updateUserInfo();
          }
        }
        })
        this.userProfileForm.get('info').markAsUntouched();
      }
      if (this.userProfileForm.get('details').dirty == true) {
        const fieldKeys = Object.keys(this.userProfileForm.get('details').value);
        fieldKeys.forEach((key) => {
              if(this.userProfileObj[key]!= undefined){
                if ((this.userProfileForm.get('details').get(key).valid) &&
                (this.userProfileForm.get('details').get(key).value != this.userProfileObj[key].value)) {
                this.saveDetail(key, userId, true);
              }
            }else{
              if ((this.userProfileForm.get('details').get(key).valid)&&(this.userProfileForm.get('details').get(key).dirty)){
                this.saveDetail(key, userId, false)
                this.userProfileForm.get('details').get(key).markAsPristine()
                
              }
            }
          
        });
        this.userProfileForm.get('details').markAsUntouched();
      }
      if (this.userProfileForm.get('extra').dirty == true) {
        const fieldKeys = Object.keys(this.userProfileForm.get('extra').value);
        fieldKeys.forEach((key) => {
          
          if(this.userProfileObj[key]!= undefined){
            if ((this.userProfileForm.get('extra').get(key).valid) &&
            (this.userProfileForm.get('extra').get(key).value != this.userProfileObj[key].value)) {
            this.saveExtraDetail(key, userId, true);
          }
        }else{
          if ((this.userProfileForm.get('extra').get(key).valid)&&(this.userProfileForm.get('extra').get(key).dirty)){
            this.saveExtraDetail(key, userId, false)
            this.userProfileForm.get('extra').get(key).markAsPristine()
            
          }
        }
        });
      }
    });
  }

  public updateUserInfo(){
    const user: User = {
      id: this.userService.getUserId(),
      email: this.userService.getUserEmail(),
      name: this.userProfileForm.get('info').get('name').value,
      updated_at: new Date(Date.now())
    }
    this.userService.updateUser(user)
                    .subscribe((data) => {
                      this.userProfileObj['name'] = data.name
                    }, (error) => {
                      console.log(error);
                    })
  }
  public saveDetail(key: string, userId: any, update: boolean) {
    let detail : User_Detail;
    if(update){
      detail = {id: this.userProfileObj[key].id,
                    data_value: this.userProfileForm.get('details').get(key).value,
                    field_type: key,
                    user_id: userId}
    }else{
      detail= {data_value: this.userProfileForm.get('details').get(key).value,
              field_type: key,
              user_id: userId}

      
    }
    this.userService.addUserDetail(detail).subscribe((updatedObj) => {
      if (this.userProfileObj[key] != undefined) {
        this.userProfileObj[key].value = updatedObj.data_value;
      }else{
        this.userProfileObj[key] = {id: updatedObj.id, value: updatedObj.data_value};
      }
    }, (error) => {
      console.log(error);
    });
  }

  public saveExtraDetail(key: string, userId: any, update: boolean) {
    let detail : User_Extra_Detail;
    if(update){
      detail = {id: this.userProfileObj[key].id,
                    field_value: this.userProfileForm.get('extra').get(key).value,
                    field_key: key,
                    user_id: userId}
    }else{
      detail= {field_value: this.userProfileForm.get('extra').get(key).value,
              field_key: key,
              user_id: userId}

      
    }
    this.userService.addUserExtraDetail(detail).subscribe((updatedObj) => {
      if (this.userProfileObj[key] != undefined) {
        this.userProfileObj[key].value = updatedObj.field_value;
      }else{
        this.userProfileObj[key] = {id: updatedObj.id, value: updatedObj.field_value};
      }
    }, (error) => {
      console.log(error);
    });
  }


  public updateProfileInitStatus(status: boolean){
    this.profileInitStatus = status
  }

  public refreshProfile(){
   window.location.reload();
   
  }

}
