import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  transfer(amount: number, accountNo: string) {
    return this.http.put(this.baseUrl + '/transaction/transfer/' + amount + '/' + accountNo, {});
  }


}
