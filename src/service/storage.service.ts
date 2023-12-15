import { Injectable } from '@angular/core';
import {ProductdDTO} from "./api/ProductdDTO";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _Basket: ProductdDTO[] = [];

  private _products!: ProductdDTO[];
  private _productsChanged$ =new BehaviorSubject<ProductdDTO[]>([])

  constructor() { }


  get products(): ProductdDTO[] {
    return this._products;
  }

  set products(value: ProductdDTO[]) {
    console.log(value)

    this._products = value;
    this._productsChanged$.next(value);

  }

  get productsChanged() {
    return this._productsChanged$.asObservable();
  }

  basket(productId:number){
    console.log(productId)
    const  product = this.products.find(p => p.id === productId)
    console.log(product)
    if(product){
      this._Basket.push(product);
    }
  }

  get Basket(): ProductdDTO[] {
    return this._Basket;
  }

  set Basket(value: ProductdDTO[]) {
    this._Basket = value;
  }
}
