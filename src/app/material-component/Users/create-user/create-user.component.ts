import { Component, OnInit } from '@angular/core';
import { FormGroup ,AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserListService } from '../user-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../../../shared/common-modal/common-modal/common-modal.component';
import { EqualPasswordsValidator } from '../../../shared/validators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userIdParam: string;
  pageTitle = 'Create User';

  status: boolean;
  message: String;
  error: string = null;
  userForm: FormGroup;
  errorMsg: any;

  hidePassword = true;
  hideConfirmPassword = true;
  
  public userName: AbstractControl;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public userGender: AbstractControl;
  public userMobile: AbstractControl;
  public userEmail: AbstractControl;

  public userPassword: AbstractControl;
  public confPassword: AbstractControl;
 
  public mobileNumber: AbstractControl;
  public roles: any[] = [];



  constructor (private router: Router, private route: ActivatedRoute, private fb: FormBuilder,  private service: UserListService, private modalService: NgbModal) {

    this.initForm();
    
  }

  ngOnInit() {}

  createNewUser(){
    debugger

    /* this.isValidUserNameAndEmail(); */

    // if (this.errorMsg == "") {

      const formValue: any = this.userForm.value;
      formValue.roles = this.roles;

      delete formValue.confPassword;

      if (this.userPassword.value == this.confPassword.value) { 
        this.service.createUser(formValue)
          .subscribe(user => {
            // log.debug(`${credentials.username} successfully logged in`);

           
            this.finally();
          });
        }
    // }

  }

  finally() {
    this.userForm.markAsPristine();
  }

 /*  isValidUserNameAndEmail() {
    this.userName.setValue(this.userName.value);

    if(this.errorMsg == "") {
      this.userEmail.setValue(this.userEmail.value);
    }

   
  } */

  focusOutFunction() {
    if (this.userPassword.value != this.confPassword.value) {
      this.message = 'Password mismatch!';
      setTimeout(() => this.message = null, 5000);
      this.userPassword.invalid;
    }
  }

  private initForm() {
    this.userForm = this.fb.group({
      'userId': [''],
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'userGender': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'userMobile': ['', Validators.compose([Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])])],

      'userPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      
      'userEmail': ['', Validators.compose([Validators.required])],
      'status': [''],
      'userRoles': this.fb.array([this.roles], Validators.compose([Validators.required])),
    }, { validator: EqualPasswordsValidator.validate('userPassword', 'confPassword') });

    this.userName = this.userForm.controls['userName'];
    this.firstName = this.userForm.controls['firstName'];
    this.lastName = this.userForm.controls['lastName'];
    this.userGender = this.userForm.controls['userGender'];
    this.userMobile = this.userForm.controls['userMobile'];

    this.userPassword = this.userForm.controls['userPassword'];
    this.confPassword = this.userForm.controls['confPassword'];
  
   
    this.userEmail = this.userForm.controls['userEmail'];

  }
}
