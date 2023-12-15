import {Component, OnInit} from '@angular/core';
import {NAME, SVG} from "../../../../environments/environment";
import {PopupService} from "../../../../service/popup.service";
import {LoginComponent} from "../../form/login/login.component";
import {ContactUsComponent} from "../../form/contact-us/contact-us.component";
import {BasketStorageService} from "../../../../service/basketStorage.service";
import {API} from "../../../../service/api/API";
import {StorageService} from "../../../../service/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/api/AuthService";

export interface CatalogDTO {
  id: number,
  name: string,
}

@Component({
  selector: 'fc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  catalogData: CatalogDTO[] | any[] = [];

  constructor(
    private API: API,
    private basketService: BasketStorageService,
    private storageService: StorageService,
    private popupService: PopupService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  public svg = SVG;
  public name = NAME;

  ngOnInit(): void {
    this.API.getAllCategories().subscribe(categories => {
      this.catalogData = categories;
      console.log(categories);
    });
  }
  favorite(){
    this.router.navigate(['user/favorite'])
  }
  login() {
    this.authService.hasRole(['ROLE_USER']) ? this.router.navigate(['user']) :
      this.authService.hasRole(['ROLE_ADMIN']) ? this.router.navigate(['admin']) :
        this.popupService.open(this.name.login, LoginComponent, {height: 40});
  }

  basket(){
    // this.basketService.checkProductIsNotEmpty() ? this.popupService.openBasket(): alert('Корзинка пуста');

    this.popupService.openBasket();
  }

  contactUs() {
    this.popupService.open(this.name.contact_us, ContactUsComponent, {height: 60, width: 60})
  }

  selectCatalogBar(id: string) {
    this.API.getDataById(Number(id)).subscribe(data => {
      console.log(data);
      this.storageService.products = data
    });
    this.router.navigate(['/catalog'])
  }

}
