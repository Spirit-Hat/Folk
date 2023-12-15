import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./page/home/home.component";
import {IntroductionComponent} from "./page/home/introduction/introduction.component";
import {AdminPanelComponent} from "./page/admin-panel/admin-panel.component";
import {CatalogComponent} from "./page/catalog/catalog.component";
import {HelpComponent} from "./page/help/help.component";
import {LoginComponent} from "./component/form/login/login.component";
import {RegistrationComponent} from "./component/form/registration/registration.component";
import {AddProductComponent} from "./page/admin-panel/add-product/add-product.component";
import {UserOrdersComponent} from "./page/admin-panel/user-orders/user-orders.component";
import {SeacrhComponent} from "./page/seacrh/seacrh.component";
import {AboutUsComponent} from "./page/about-us/about-us.component";
import {ProductPageComponent} from "./page/product-page/product-page.component";
import {AddCatalogComponent} from "./page/admin-panel/add-catalog/add-catalog.component";
import {PlacingAnOrderComponent} from "./page/placing-an-order/placing-an-order.component";
import {BasketGuard} from "./guard/BasketGuard";
import {AuthGuard} from "./guard/AuthGuard";
import {UserPageComponent} from "./page/user-page/user-page.component";
import {OrdersComponent} from "./page/user-page/orders/orders.component";
import {FavoriteComponent} from "./page/user-page/favorite/favorite.component";
import {IsLoginGuard} from "./guard/IsLoginGuard";

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      {path: '', component: IntroductionComponent},
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsLoginGuard]
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [IsLoginGuard]
      },
      {path: 'help', component: HelpComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'search', component: SeacrhComponent},
      {path: 'catalog', component: CatalogComponent,
        children: [
          {path: ':id', component: CatalogComponent}
        ]
      },
      {
        path: 'checkout',
        component: PlacingAnOrderComponent,
        canActivate: [BasketGuard]
      },
      {
        path: 'user',
        component: UserPageComponent,
        canActivate:[AuthGuard],
        data:{
          expectedRoles: ['ROLE_USER']
        },
        children: [
          {path: '', component: OrdersComponent},
          {path: 'orders', component: OrdersComponent},
          {path: 'favorite', component: FavoriteComponent}
        ]
      },
      {path: 'catalog/:id/:id', component: ProductPageComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate:[AuthGuard],
    data:{
      expectedRoles: ['ROLE_ADMIN']
    },
    children: [
      {path: '', redirectTo: 'orders', pathMatch: 'full'},
      {path: 'orders', component: UserOrdersComponent},
      {path: 'add-product', component: AddProductComponent},
      {path: 'add-catalog', component: AddCatalogComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
