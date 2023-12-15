import { Component, OnInit } from '@angular/core';
import {ProductdDTO} from "../../../../service/api/ProductdDTO";
import {API} from "../../../../service/api/API";
import {StorageService} from "../../../../service/storage.service";

@Component({
  selector: 'fc-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  products!: ProductdDTO[];

  constructor(
    private API:API) {
  }
  ngOnInit(): void {
    //id user
    const id: number = 0
    this.API.getListOfFavoriteUser().subscribe(products => {
      this.products = products
    });

    console.log(this.products);
  }


  //
  // products!: ProductdDTO[];
  //
  //
  // constructor(
  //   private API:API,
  //   private storageService: StorageService) {
  // }
  //
  // ngOnInit(): void {
  //   this.API.getListOfProduct().subscribe(products => {
  //     this.storageService.products = products
  //   });
  //
  //   this.storageService.productsChanged.subscribe(
  //     (products:ProductdDTO[]) =>{
  //       this.products = products;
  //     }
  //   )
  //   console.log(this.products);
  //   this.products = this.storageService.products;
  // }


}
