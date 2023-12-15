import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogModule} from "@angular/material/dialog";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

//PAGES
import {HomeComponent} from './page/home/home.component';
import {AdminPanelComponent} from './page/admin-panel/admin-panel.component';
import {CatalogComponent} from './page/catalog/catalog.component';
import {SeacrhComponent} from './page/seacrh/seacrh.component';
import {IntroductionComponent} from './page/home/introduction/introduction.component';
import {HelpComponent} from './page/help/help.component';
import {AboutUsComponent} from './page/about-us/about-us.component';
import {ProductPageComponent} from './page/product-page/product-page.component';

//FORMS
import {LoginComponent} from './component/form/login/login.component';
import {RegistrationComponent} from './component/form/registration/registration.component';

//ADMIN-COMPONENTS
import {AddProductComponent} from './page/admin-panel/add-product/add-product.component';
import {UserOrdersComponent} from './page/admin-panel/user-orders/user-orders.component';

//BASIC_COMPONENTS
import {HeaderComponent} from './component/basic/header/header.component';
import {FooterComponent} from './component/basic/footer/footer.component';
import {SearchBarComponent} from './component/basic/header/search-bar/search-bar.component';
import {SliderComponent} from './component/scroll-type/slider/slider.component';
import {ProductTileComponent} from './component/tyle-component/product-tile/product-tile.component';


import { InteractiveCatalogComponent } from './page/interactive-catalog/interactive-catalog.component';
import { StripProductComponent } from './component/scroll-type/strip-product/strip-product.component';
import { InputFormComponent } from "./component/form/input-form/input-form.component";
import { CustomDialogPopupComponent } from './component/popup-type/custom-dialog-popup/custom-dialog-popup.component';
import { BasketComponent } from './component/user-component/basket/basket.component';
import { BasketItemComponent } from './component/tyle-component/basket-item/basket-item.component';
import { ContactUsComponent } from './component/form/contact-us/contact-us.component';
import { InputComponent } from './component/form/input/input.component';
import {ProductGalleryComponent} from "./component/scroll-type/product-gallery/product-gallery.component";
import {AuthInterceptor} from "./Interceptors/AuthInterceptor";
import { UploadProductImgComponent } from './component/form/upload-product-img/upload-product-img.component';
import { AddCatalogComponent } from './page/admin-panel/add-catalog/add-catalog.component';
import { ProductOrderItemComponent } from './component/tyle-component/product-order-item/product-order-item.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { PlacingAnOrderComponent } from './page/placing-an-order/placing-an-order.component';
import { UserPageComponent } from './page/user-page/user-page.component';
import {RoleDirective} from "../directive/role.directive";
import {OrdersComponent} from "./page/user-page/orders/orders.component";
import { FavoriteComponent } from './page/user-page/favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminPanelComponent,
    CatalogComponent,
    SeacrhComponent,
    IntroductionComponent,
    HelpComponent,
    LoginComponent,
    RegistrationComponent,
    AddProductComponent,
    UserOrdersComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    SearchBarComponent,
    SliderComponent,
    ProductTileComponent,
    ProductPageComponent,
    InteractiveCatalogComponent,
    StripProductComponent,
    InputFormComponent,
    CustomDialogPopupComponent,
    BasketComponent,
    BasketItemComponent,
    ContactUsComponent,
    InputComponent,
    ProductGalleryComponent,
    UploadProductImgComponent,
    AddCatalogComponent,
    ProductOrderItemComponent,
    PlacingAnOrderComponent,
    UserPageComponent,
    RoleDirective,
    OrdersComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ], bootstrap: [AppComponent]
})
export class AppModule {
}
