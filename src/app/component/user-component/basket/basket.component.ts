import {Component, OnInit} from '@angular/core';
import {NAME, SVG} from "../../../../environments/environment";
import {ProductDTO, STATUS} from "../../../../interface/product";
import {BasketStorageService} from "../../../../service/basketStorage.service";
import {Router} from "@angular/router";
import {API} from "../../../../service/api/API";
import {PopupService} from "../../../../service/popup.service";

@Component({
  selector: 'fc-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(
    public basketService: BasketStorageService,
    private router: Router,
    private Api: API,
    private popupService:PopupService
  ) { }

  public name = NAME;
  public  basketList: ProductDTO[] =  this.basketService.getProducts();
  public svg = SVG;

  ngOnInit(): void {
    for(let i=0; i < 20; i++){
      let product = {
        id: i,
        image: [],
        name: "test",
        previewImage: "assets/test/img_original_0 (1).webp",
        price: 120,
        amount: 20,
        status: STATUS.IN_STORAGE
      }
    }

  }

  deleteItemFromBasket(index: number) {
    this.basketService.deleteProduct(index);
    this.basketList= this.basketService.getProducts();
  }
  favoriteItemEvent(index: number){
    console.log(index)
    this.Api.addnewFavoriteProduct(index)

  }
  makeOrder(){
    this.popupService.closePopup();
    this.router.navigate(['checkout'])
  }
  totalPrice(){
    let totalPrice = 0;
    this.basketList.forEach((product:ProductDTO)=>{
      totalPrice += product.userAmount ? product.userAmount * product.price : product.price
    })
    return totalPrice;
  }
}
