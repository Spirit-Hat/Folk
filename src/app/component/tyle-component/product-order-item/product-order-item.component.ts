import {Component, Input, OnInit} from '@angular/core';
import {EOrderStatus, ProductOrderDTO} from "../../../../models/Order";

@Component({
  selector: 'fc-product-order-item',
  templateUrl: './product-order-item.component.html',
  styleUrls: ['./product-order-item.component.scss']
})
export class ProductOrderItemComponent implements OnInit {

  constructor() { }
  currentId: number| undefined;
  @Input() simpleView: boolean = false;

  ngOnInit(): void {
    this.list =  Object.keys(EOrderStatus)
  }
  @Input() orders!: ProductOrderDTO[];

  list!: any;
  getValue(key: string) {
    // @ts-ignore
    return this.list[key]
  }
}
