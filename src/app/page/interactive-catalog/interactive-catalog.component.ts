import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../service/storage.service";
import {ProductdDTO} from "../../../service/api/ProductdDTO";
import {API} from "../../../service/api/API";

@Component({
  selector: 'fc-interactive-catalog',
  templateUrl: './interactive-catalog.component.html',
  styleUrls: ['./interactive-catalog.component.scss']
})
export class InteractiveCatalogComponent implements OnInit {
  products!: ProductdDTO[];


  getAmount(){
    return this.products.length;
  }

  constructor(
    private API:API,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.API.getListOfProduct().subscribe(products => {
      this.storageService.products = products
    });

    this.storageService.productsChanged.subscribe(
      (products:ProductdDTO[]) =>{
        this.products = products;
      }
    )
    console.log(this.products);
    this.products = this.storageService.products;

  }

}
