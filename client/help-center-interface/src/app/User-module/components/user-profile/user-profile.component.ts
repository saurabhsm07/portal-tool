import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { OrganizationService } from '../../services/organization-service/organization.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

 public userProfileObj = {}   //empty object for storing user profile data
 
  constructor(private userService: UserService,
              private organizationService: OrganizationService) { }


  ngOnInit() {
    const userId = this.userService.getUserId()
    this.userService.getUserDetails(userId)
                    .subscribe((profileData) => {
                      this.setUserProfileObject(profileData);
                      
                    }, (error) => {
                      console.log('ERROR: \n' + error);
                    })

    
    // this.organizationService.getOrganization()

  }

/**
 * 
 * @param profileData object with arrays containing user details, user extra details
 */
  public setUserProfileObject(profileData) {
    const { details, extraDetails } = profileData;

    this.userProfileObj['name'] = this.userService.getUserName();
  
    details.forEach(detail => {
      this.userProfileObj[detail.field_type] = detail.data_value;
    });
    extraDetails.forEach(detail => {
      this.userProfileObj[detail.field_key] = detail.field_value;
    });

    console.log(this.userProfileObj);
  }
}
