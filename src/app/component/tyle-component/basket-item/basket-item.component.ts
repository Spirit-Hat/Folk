import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDTO} from "../../../../interface/product";
import {BasketStorageService} from "../../../../service/basketStorage.service";
import {PopupService} from "../../../../service/popup.service";

@Component({
  selector: 'fc-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {

  constructor(
    private basketService: BasketStorageService,
    ) {

  }
  @Input() simpleView: boolean = false;
  @Input() last: boolean = false;
  @Input() item!: ProductDTO;
  @Output() deleteEventEmit = new EventEmitter<number>();
  @Output() favoriteEventEmit = new EventEmitter<number>();

  ngOnInit(): void {
    const amount = this.basketService.getProductById(this.item.id).userAmount;
    amount && amount > 1 ? '' : this.item.userAmount = 1;
    this.basketService.setProductById(this.item.id, this.item);
  }

  changeCount(value: number) {
    if(this.item.userAmount && this.item.amount){
      if (this.item.userAmount + value > 0 && this.item.userAmount + value <= this.item?.amount) {
        this.item.userAmount += value;
        this.basketService.setProductById(this.item.id, this.item);
      }
    }
  }
}
