import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/ITransaction';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CustomerService } from 'src/app/services/customer.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transferForm!: FormGroup;
  airtimeForm!: FormGroup;
  transaction!: Transaction;
  userSubmitted!: boolean;
  accountBalance: number;

  nextClicked!: boolean;
  showOtherForm!: boolean;

  emailOTP : string;
  emailOTPValid: number = 0;


  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private router: Router,
    private transactionService: TransactionService,
    private customerService: CustomerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.sendMoneyForm();
    this.buyAirtimeForm();
    this.getUserDetails();
  }


  getUserDetails() {
    this.customerService.getDetails().subscribe(
      (response: any) => {
        const user = response.message;
        if (user) {
         return this.accountBalance = user.accountBal;
      }
    });

}


  sendMoneyForm() {

    this.transferForm = this.fb.group({

      receiverAccountNo: ['', Validators.required],
      amountSent: [null, Validators.required],
      pin: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  buyAirtimeForm() {

    this.airtimeForm = this.fb.group({

      receiverAccountNo: ['', Validators.required],
      amountSent: [null, Validators.required],
      pin: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  sendMoney(formObj) {
    this.userSubmitted = true;
    this.spinner.show();
      this.transactionService.transfer(this.transferForm.value.amountSent, this.transferForm.value.receiverAccountNo).subscribe(
        (response: any) => {
          if(response.status == true){
            this.spinner.hide();
            Swal.fire(response.message, 'success'  );
            this.onReset();
            this.router.navigate(['/user']);

          }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Error!',  error.error.message, 'error'  );
      });

  }

  onReset() {
    this.userSubmitted = false;
    this.transferForm.reset();
  }

  refreshPage(){
    window.location.reload();
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



}
