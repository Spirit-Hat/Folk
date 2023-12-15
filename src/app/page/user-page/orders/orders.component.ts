import {Component, OnInit} from '@angular/core';
import {API} from "../../../../service/api/API";
import {ProductOrderDTO} from "../../../../models/Order";

@Component({
  selector: 'fc-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  constructor(
    private API: API,
  ) { }

  public orders: ProductOrderDTO[] =[];

  ngOnInit(): void {
    this.API.getListOfOrdersByUser().subscribe(
      (response) =>{
        this.orders = response;
      },
      (error => {
        console.log("Error",error)
      })
    )
  }
}
