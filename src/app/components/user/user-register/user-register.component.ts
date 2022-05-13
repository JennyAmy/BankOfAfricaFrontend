import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from 'src/app/models/IUser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/validators/PasswordValidator';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted!: boolean;

  nextClicked!: boolean;
  showOtherForm!: boolean;

  emailOTP : string;
  emailOTPValid: number = 0;


  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }


  createRegistrationForm() {

    this.registrationForm = this.fb.group({

      firstname: ['', Validators.required],
      // middlename: [null],
      surname: [null, Validators.required],
      // gender: [null, Validators.required],
      email: [null,[Validators.required, Validators.email]],
      // phoneNo: [null, [Validators.required, Validators.maxLength(11)]],
      accountNumber : ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }



  onSubmit() {
    if (this.emailOTPValid === 0 || this.emailOTPValid === 2) {
      this.alertify.error('Kindly validate email before proceeding.');
      return;
    }
    // this.userSubmitted = true;
    // if (this.registrationForm.valid) {
    //   // this.customer = Object.assign(this.user, this.registrationForm.value);
    //   this.authService.registerUser(this.userData()).subscribe(() => {
    //     this.onReset();
    //     this.alertify.success('Successfully registered!');
    //   });
    // }

  }

  onReset() {
    this.userSubmitted = false;
    this.registrationForm.reset();
  }


  selectTab(IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.showOtherForm = true;
    }
  }

  backToForm(){
    this.showOtherForm = false;
  }

  confirmOTP() {
       if(this.emailOTP === "1234"){
        this.emailOTPValid = 1;
       } else{
        this.emailOTPValid = 2;
       }
    }

    enterOtpAgain() {
      this.emailOTPValid = 0;
      this.emailOTP = null;
    }


}
