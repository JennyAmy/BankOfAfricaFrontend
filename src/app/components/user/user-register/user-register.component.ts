import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/validators/PasswordValidator';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

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
  loading: boolean = false;

  emailOTP : string;
  emailOTPValid: number = 0;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }


  createRegistrationForm() {

    this.registrationForm = this.fb.group({

      firstname: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["",[Validators.required, Validators.email]],
      accountNumber : ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }



  submit(formObj) {
    if (this.emailOTPValid === 0 || this.emailOTPValid === 2) {
      Swal.fire('Error!',  'Kindly validate email before proceeding.', 'error'  );
      return;
    }
    this.userSubmitted = true;
    this.spinner.show();
      this.authService.registerUser(formObj.value).subscribe(
        (response: any) => {
          if(response.status == true){
            this.spinner.hide();
            Swal.fire('Congratulations!',  'Account created successfully! Please login to continue', 'success'  );
            this.onReset();
            this.router.navigate(['/login']);
          }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Error!',  error.error.message, 'error'  );
      });

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
    this.emailOTPValid = 0;
    this.emailOTP = '';
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
