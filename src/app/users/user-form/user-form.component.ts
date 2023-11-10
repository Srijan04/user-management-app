import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessUnit } from 'src/app/core/models/business-unit.model';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  businessUnits: BusinessUnit[] = [];
  userForm: FormGroup;
  currentDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
  ) {
    // Initializing the userForm FormGroup
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      businessUnit: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.commonService.getBusinessUnits().subscribe(units => {
      this.businessUnits = units;
    });
  }

  get userFormControls() {
    return this.userForm.controls;
  }


  addUser() {
    const newUser = this.userForm.value // adding user data
    this.commonService.addUser(newUser);
    this.resetUserForm();
  }

  resetUserForm() {
    this.userForm.reset();
    this.userForm.markAsUntouched();
  }
}
