import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/ITransaction';
import { AlertifyService } from 'src/app/services/alertify.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {


  transferForm!: FormGroup;
  transaction!: Transaction;
  userSubmitted!: boolean;

  nextClicked!: boolean;
  showOtherForm!: boolean;

  emailOTP : string;
  emailOTPValid: number = 0;


  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private router: Router,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.sendMoneyForm();
  }


  sendMoneyForm() {

    this.transferForm = this.fb.group({

      receiverAccountNo: ['', Validators.required],
      amountSent: [null, Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  onSubmit() {
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
