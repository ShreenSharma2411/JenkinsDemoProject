import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  titlePage = 'UserProfile';
  userProfileForm: FormGroup;
  onChangePwd: boolean = false;

  errorMsg: any;


  public userName: AbstractControl;
  public name: AbstractControl;
  public gender: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public mobileNo: AbstractControl;
  public role: AbstractControl;
  public site: AbstractControl;
  public oldPassword: AbstractControl;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;





  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  // confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  // firstName = new FormControl('', [Validators.required, Validators.minLength(4)]);
  // lastName = new FormControl('', [Validators.required, Validators.minLength(4)]);
  // gender = new FormControl('', [Validators.required]);
  // phnNo = new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]);
  // hidePassword = true;
  // hideConfirmPassword = true;



  // getErrorMessage() {
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  // ErrorMessage() {
  //   return this.firstName.hasError('firstName') ? 'Not a valid firstName' : '';
  // }
  // ErrMessage() {
  //   return this.lastName.hasError('lastName') ? 'Not a valid lastName' : '';
  // }
  // ErrorMsg() {
  //   return this.phnNo.hasError('phnNo') ? 'Not a valid phnNo' : '';
  // }

  constructor(private fb: FormBuilder) {

    this.createForm();

    this.userName.setValue('Ramesh Singh');
    this.gender.setValue('Male');
    this.email.setValue('rmsh@gmail.com');
    this.mobileNo.setValue('9235254565');
    this.role.setValue('Supervisor');
    this.site.setValue('Gujrat Hydroelectric PowerPlant');
  }

  ngOnInit() {
  }

  onChangePass() {
    this.onChangePwd = true
    this.userProfileForm.controls['password'].reset();
    this.userProfileForm.controls['confPassword'].reset();
  }



  private createForm() {
    {
      this.userProfileForm = this.fb.group({

        'userName': ['', Validators.required],
        'name': ['', Validators.required],
        'gender': ['', Validators.required],
        'email': ['', Validators.required],
        'mobileNo': ['', Validators.required],
        'role': ['', Validators.required],
        'site': ['', Validators.required],
        'oldPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      })

      this.userName = this.userProfileForm.controls['userName'];
      this.name = this.userProfileForm.controls['name'];
      this.gender = this.userProfileForm.controls['gender'];
      this.email = this.userProfileForm.controls['email'];
      this.mobileNo = this.userProfileForm.controls['mobileNo'];
      this.role = this.userProfileForm.controls['role'];
      this.site = this.userProfileForm.controls['site'];
      this.oldPassword = this.userProfileForm.controls['oldPassword'];
      this.newPassword = this.userProfileForm.controls['newPassword'];
      this.confirmPassword = this.userProfileForm.controls['confirmPassword'];

    }
  }
}
