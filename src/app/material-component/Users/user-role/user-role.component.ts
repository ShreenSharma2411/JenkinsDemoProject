import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  titlePage = 'New User Role';
  rolelist = ['All', 'Add Record', ' View Record', 'Modifiy Record','Delete Record'];
  modulelist = ['All', 'Create User', 'Create Role', 'Site', 'Assets', 'Alerts', 'Cases']; 

  rolename = new FormControl('', [Validators.required, Validators.minLength(4)]);
  dispname = new FormControl('', [Validators.required, Validators.minLength(4)]);

  ErrorMessage(){
    return this.rolename.hasError('rolename') ? 'Not a valid rolename' : '';
  }
  ErrorMsg(){
    return this.dispname.hasError('dispname') ? 'Not a valid dispname' : '';
  }

  constructor() { }

  ngOnInit() {
  }

}
