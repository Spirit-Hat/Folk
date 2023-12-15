import {Component, OnInit} from '@angular/core';
import {API} from "../../../../service/api/API";
import {ProductOrderDTO} from "../../../../models/Order";

@Component({
  selector: 'fc-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})

export class UserOrdersComponent implements OnInit {

  constructor(
    private API: API,
  ) { }

  orders: ProductOrderDTO[] =[];

  ngOnInit(): void {
    this.API.getOrderList().subscribe(
      (response) =>{
        this.orders = response;
      },
      (error => {
        console.log("Error",error)
      })
    )
  }
}
