import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/IUser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  model: any = {};
  // jwtHelper = new JwtHelperService();
  decodedToken: any;
  private _shown = false;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService

    ) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.spinner.show();
      this.authService.authUser(loginForm.value).subscribe(
        (response: any) => {
          const user = response.message;
          if (user) {
            this.spinner.hide();
                  localStorage.setItem('token', user.token);
                  localStorage.setItem('userName', user.firstname);
                  // this.decodedToken = this.jwtHelper.decodeToken(user.token);
                  this.alertify.success('Logged in successfully');
                  this.router.navigate(['/user']);
        }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Error!',  error.error.message, 'error'  );
      });

  }

  showPassword() {
    let pwd: HTMLElement = <HTMLElement>document.getElementById('pwd');
    this._shown = !this._shown;
    if (this._shown) {
      pwd.setAttribute('type', 'text');
    } else {
      pwd.setAttribute('type', 'password');
    }
  }
}
