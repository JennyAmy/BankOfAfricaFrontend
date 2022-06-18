import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  openBankAccount(customer: Customer) {
    return this.http.post(this.baseUrl + '/bankaccount/create', customer);
  }

  getDetails(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + '/bankAccount/get-details');
  }

   //Checks if the account exists onKeyUp event. If account already exists in customers table, returns all the details and populates the form
   getDetailsByAccountNo(accountNo: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + '/bankAccount/get-details-accountNo/' + accountNo);
  }

  //Checks if the email exists in customers table on keyUp Event during appUser sign up form. If email doesnt exist,  throws a bad request message
  isEmailExisting(email: string) {
    return this.http.post(this.baseUrl + '/bankAccount/is-email-exists', email);
  }

}
