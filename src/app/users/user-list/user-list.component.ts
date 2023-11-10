import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/core/models/business-unit.model';
import { User } from 'src/app/core/models/user.model';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  businessUnits: BusinessUnit[] = [];
  usersList: any[] = [];
  isAscending: boolean = true;
  sortField: string = '';

  constructor(
    private commonService: CommonService, 
  ) { }

  ngOnInit() {
    this.getBusinessUnitDetails();
  }

  getBusinessUnitDetails() {
    this.commonService.getBusinessUnits().subscribe({
      next: (units: BusinessUnit[]) => {
        this.businessUnits = units;
        this.getUserDetails();
      },
      error: (error) => {
        console.error('Error fetching business units:', error);
      }
    });
  }

  getUserDetails() {
    this.commonService.getUsers().subscribe({
      next: (users: User[]) => {
        this.usersList = this.processUserDetails(users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  processUserDetails(users: User[]) {
    return users.map(user => {
      const businessUnit = this.businessUnits.find(unit => unit.id == user.businessUnit);
      return {
        name: user.name,
        email: user.email,
        dob: user.dob,
        businessUnit: businessUnit?.name
      };
    });
  }

  sort(field: string) {
    if (field === this.sortField) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortField = field;
      this.isAscending = true;
    }
  
    const sortOrder = this.isAscending ? 1 : -1;
    this.usersList.sort((a, b) => {
      return sortOrder * a[field].localeCompare(b[field], undefined, { sensitivity: 'base' });
    });  
  }

  sortIcon(field: string): string {
    if (field === this.sortField) {
      return this.isAscending ? '↑' : '↓';
    }
    return '↑↓';
  }

}
