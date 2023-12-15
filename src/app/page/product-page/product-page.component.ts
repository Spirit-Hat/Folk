import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductDTO, STATUS} from "../../../interface/product";
import {zoomingData} from "../../component/scroll-type/product-gallery/product-gallery.component";
import {BasketStorageService} from "../../../service/basketStorage.service";
import {SVG} from "../../../environments/environment";
import {PopupService} from "../../../service/popup.service";
import {API} from "../../../service/api/API";
import {ImageService} from "../../../service/subscribe/image.service";

@Component({
  selector: 'fc-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(private activatedRote: ActivatedRoute,
              private api: API,
              private basketStorage: BasketStorageService,
              private popupService: PopupService,
              private imageService:ImageService
  ) {
  }

  public svg = SVG;
  public product!: ProductDTO ;

  getStatusProduct(){
    // @ts-ignore
    return STATUS[this.product.status]
  }

  ngOnInit(): void {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    console.log(id)
    this.api.getProductById(id).subscribe(product => {
      console.log(product)
      this.product = product
      this.imageService.itemList = product.image;
      console.log(this.product)

    })
  }

  public resultChangeEmit(css: zoomingData, zoomResultBox: HTMLElement) {
    Object.keys(css).forEach((key: string) => {
      // @ts-ignore
      zoomResultBox.style.setProperty(key, css[key]);
    });
  }
  public changeCount(value: number) {
    if (this.product.userAmount && this.product.amount) {
      if (this.product.userAmount + value > 0 && this.product.userAmount + value <= this.product.amount) {
        if (this.basketStorage.hasProductById(this.product.id)) this.basketStorage.setProductById(this.product.id, this.product);
        this.product.userAmount += value;
      }
    }
  }
  public addToBasket() {
    if (!this.basketStorage.hasProductById(this.product.id)) {
      this.basketStorage.addProduct(this.product);
    } else {
      this.popupService.openBasket()
    }
  }

}
