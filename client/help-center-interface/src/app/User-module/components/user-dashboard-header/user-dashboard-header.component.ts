import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../class/user';
import { OrganizationService } from '../../services/organization-service/organization.service';
import { Organization } from '../../class/organization';

@Component({
  selector: 'app-user-dashboard-header',
  templateUrl: './user-dashboard-header.component.html',
  styleUrls: ['./user-dashboard-header.component.scss']
})
export class UserDashboardHeaderComponent implements OnInit {

  @Input() dashboardType: string    //string value for type of dashboard being viewed (article, request, profile, overview, entitlement etc)

  public userId: number; //userId of the current logged in user
  public organizationIds: number[]; //ids of organizations assigned to the user 
  public userObj: User; // logged in user Object
  public organizationList: Organization[]; //list of organizations user has access to
  
  constructor(private userService: UserService, 
              private organizationService: OrganizationService) { }

  ngOnInit() {

    console.log(this.dashboardType);
    this.userId = this.userService.getUserId();
    this.organizationIds = this.userService.getOrganizationIds();

    this.userService.getUser(this.userId).subscribe((data) => {
      this.userObj = data.user;
      console.log( this.userObj);
    }, (error) => {
      console.log('ERROR : \n');
      console.log(error);
    })
  
    this.organizationService.getOrganizationByIds(this.organizationIds)
                            .subscribe((data) => {
                              console.log(data);
                              this.organizationList = data;
                            }, (error) => {

                            })
  
  }


  public getOrganizationString(){
    return this.organizationList.map(org => org.name).toString().replace(',', ', ');
  }

  checkDashboardType(tabName){
    if(this.dashboardType == tabName)
      return true;
    else
      return false; 
  }

}
