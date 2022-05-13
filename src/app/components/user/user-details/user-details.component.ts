import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/ICustomer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  customer = new Customer();
  customerId!: number;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
  //   this.customerId = +this.route.snapshot.params['id'];
  //   this.route.data.subscribe(
  //     (data: Customer) => {
  //       this.customer = data['prp'];

  //     }
  //   );
  }

}
