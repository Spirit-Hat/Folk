import {Component, Input, OnInit} from '@angular/core';
import {SVG} from "../../../../environments/environment";
import {ProductDTO, STATUS} from "../../../../interface/product";
import {BasketStorageService} from "../../../../service/basketStorage.service";
import {PopupService} from "../../../../service/popup.service";
import {EProductStatus} from "../../../page/admin-panel/add-product/add-product.component";

@Component({
  selector: 'fc-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {

  constructor(
    private popup: PopupService,
    private basketService: BasketStorageService
  ) {
  }
  @Input() simpleView: boolean = false;
  @Input() routingPath: string = "";
  @Input() item: ProductDTO = {
    id: 0,
    name: '',
    previewImage: '',
    image: [],
    status: "AVAILABLE",
    price: 1200
  };

  svg = SVG
  productStatus = STATUS;

  getProductStatus(): string | undefined{
    // @ts-ignore
    return EProductStatus[this.item.status]
  }

  ngOnInit(): void {
  }

  putInBasket() {
    if(this.hasIn()){
      this.popup.openBasket();
      return
    }
    if(!this.disabled()){
      this.basketService.addProduct(this.item);
    }
  }

  disabled(): boolean{
    return this.item.status == "NOT_AVAILABLE" || this.item.status == "EXPECTED"
  }

  hasIn(): boolean{
    return this.basketService.hasProductById(this.item.id);
  }
}
