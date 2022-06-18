import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserForLogin, UserForRegister } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  //Checks if the account exists when signup button is clicked. If account already exists in appusers table, it throws a bad request message
  userExists(accountNo: string) {
    return this.http.post(this.baseUrl + '/appUser/user-exists/', accountNo);
  }

  //This would be associated with the confirm otp button. After the user has entered the otp, this would validate the account
  validateAccount(accountNo: string) {
    return this.http.post(this.baseUrl + '/appUser/validate-account/', accountNo);
  }


}
