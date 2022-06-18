import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/ITransaction';
import { AlertifyService } from 'src/app/services/alertify.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  transferForm!: FormGroup;
  airtimeForm!: FormGroup;
  transaction!: Transaction;
  userSubmitted!: boolean;

  loggedInUser: string;

  nextClicked!: boolean;
  showOtherForm!: boolean;

  emailOTP : string;
  emailOTPValid: number = 0;


  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private router: Router,
    private transactionService: TransactionService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.sendMoneyForm();
    this.buyAirtimeForm();
    this.loggedIn();
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

  loggedIn() {
    this.loggedInUser = localStorage.getItem('userName');
    return this.loggedInUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.alertify.success('You are logged out!')
    this.router.navigate(['user/login'])
  }

  onReset() {
    this.userSubmitted = false;
    this.transferForm.reset();
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
