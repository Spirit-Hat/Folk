import { Component, OnInit } from '@angular/core';
import {API} from "../../../service/api/API";
import {StorageService} from "../../../service/storage.service";
import {ProductdDTO} from "../../../service/api/ProductdDTO";

@Component({
  selector: 'fc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products!: ProductdDTO[];


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
