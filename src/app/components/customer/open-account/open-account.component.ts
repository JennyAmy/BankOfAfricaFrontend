import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Customer } from 'src/app/models/ICustomer';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

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
    private customerService: CustomerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.openBankAccountForm();
  }

  openBankAccountForm() {
    this.openAccountForm = this.fb.group({
        firstname: ['', Validators.required],
        middlename: [''],
        surname: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        title: ['', Validators.required],
        gender: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        email: ['',[Validators.required, Validators.email]],
        phoneNo: ['', [Validators.required, Validators.maxLength(11)]],
        address: ['', Validators.required],
        bvn: ['', [Validators.required, Validators.maxLength(11)]],
        nin: ['', [Validators.required, Validators.maxLength(11)]],
        accountType: ['', Validators.required]
    });
  }


  createAccount(formObj) {
    if (this.emailOTPValid === 0 || this.emailOTPValid === 2) {
      Swal.fire('Error!',  'Kindly validate email before proceeding.', 'error');
      return;
    }
    this.userSubmitted = true;
    this.spinner.show();
      this.customerService.openBankAccount(formObj.value).subscribe(
        (response: any) => {
          if(response.status == true){
            this.spinner.hide();
            Swal.fire('Congratulations!',  response.message, 'success'  );
            this.onReset();
            this.router.navigate(['/']);
          }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Error!',  error.error.message, 'error'  );
      });

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
      this.emailOTP = '';
    }

}








