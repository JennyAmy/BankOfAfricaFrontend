import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  model: any = {};
  private _shown = false;

  constructor(
    // private authService: AuthService, private alertify: AlertifyService,
  //   private router: Router
  private route: Router,
    private alert: AlertifyService) { }

  ngOnInit(): void {
  }


  login() {
    // this.authService.login(this.model).subscribe(
    //   _next => { },
    // _error => {
    //     // console.log(_error);
    //     this.alert.error(_error.message);
    //   },
    //   () => {
    //     // navigate to dashboard page on complete
    //     this.route.navigate(["/customer/dashboard"]);
    //   }
    // );
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

  onLogin(loginForm: NgForm) {
    // console.log(loginForm.value);
    // this.authService.authUser(loginForm.value).subscribe(
    //   (response: UserForLogin) => {
    //     console.log(response);
    //     const user = response;
    //     if (user) {
    //       localStorage.setItem('token', user.token);
    //       localStorage.setItem('userName', user.userName);
    //       this.alertify.success('Logged in successfully');
    //       this.router.navigate(['/']);
    //     }
    //   }
    // );
  }
}
