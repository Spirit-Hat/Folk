import {Component, OnInit} from '@angular/core';
import {SVG} from "../../../../../environments/environment";
import {API} from "../../../../../service/api/API";
import {StorageService} from "../../../../../service/storage.service";

@Component({
  selector: 'fc-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  svg = SVG

  constructor(
    private api: API,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
  }

  searchRequest(value: string) {
    console.log(value)
    this.api.searchProducts(value).subscribe(products => {
      console.log(products)
      this.storageService.products = products
    });

  }
}
