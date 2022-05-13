import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Customer } from 'src/app/models/ICustomer';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.css']
})
export class OpenAccountComponent implements OnInit {

  // @ViewChild('formTabs') formTabs?: TabsetComponent;

  openAccountForm: FormGroup;
  nextClicked!: boolean;
  showOtherForm!: boolean;
  userSubmitted: boolean;

  emailOTP : string;
  emailOTPValid: number = 0;
  customer = new Customer();

  accountTypes: any[] = [
    { id: 1, name: 'Savings Account' },
    { id: 2, name: 'Current Account' }
  ];

  maritalStatusList: any[] = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Married' },
    { id: 3, name: 'Other' },
    { id: 3, name: 'Prefer Not To Say' }
  ];

  titles: any[] = [
    { id: 1, name: 'Miss' },
    { id: 2, name: 'Mrs' },
    { id: 3, name: 'Mr' }
  ];

  genders: any[] = [
    { id: 1, name: 'Female' },
    { id: 2, name: 'Male' },
    { id: 3, name: 'Other' }
  ];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.openBankAccountForm();
  }

  openBankAccountForm() {
    this.openAccountForm = this.fb.group({
        firstname: ['', Validators.required],
        middlename: [null],
        surname: [null, Validators.required],
        dateOfBirth: [null, Validators.required],
        title: [null, Validators.required],
        gender: [null, Validators.required],
        maritalStatus: [null, Validators.required],
        email: [null,[Validators.required, Validators.email]],
        phoneNo: [null, [Validators.required, Validators.maxLength(11)]],
        address: [null, Validators.required],
        bvn: [null, [Validators.required, Validators.maxLength(11)]],
        nin: [null, [Validators.required, Validators.maxLength(11)]],
        accountType: [null, Validators.required]
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
    this.openAccountForm.reset();
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




// get BasicInfo() {
//   // return this.addPropertyForm.get('BasicInfo') as FormGroup;
//   return this.openAccountForm.controls['BasicInfo'] as FormGroup;
// }
// get OtherInfo() {
//   return this.openAccountForm.controls['OtherInfo'] as FormGroup;
// }

// get AddressInfo() {
//   return this.openAccountForm.controls['AddressInfo'] as FormGroup;
// }



// get firstname() {
//   return this.BasicInfo.get('firstname') as FormControl;
// }

// get middlename() {
//   return this.BasicInfo.get('middlename') as FormControl;
// }

// get surname() {
//   return this.BasicInfo.get('surname') as FormControl
// }
// get dateOfBirth() {
//   return this.BasicInfo.get('dateOfBirth') as FormControl
// }
// get title() {
//   return this.BasicInfo.get('title') as FormControl
// }

// get gender() {
//   return this.BasicInfo.get('gender') as FormControl
// }

// get maritalStatus() {
//   return this.BasicInfo.get('maritalStatus') as FormControl
// }

// get phoneNo() {
//   return this.AddressInfo.get('phoneNo') as FormControl
// }

// get email() {
//   return this.AddressInfo.get('email') as FormControl
// }
// get address() {
//   return this.AddressInfo.get('address') as FormControl
// }
// get bvn() {
//   return this.OtherInfo.get('bvn') as FormControl
// }
// get nin() {
//   return this.OtherInfo.get('nin') as FormControl
// }
// get accountType() {
//   return this.OtherInfo.get('accountType') as FormControl
// }
}








