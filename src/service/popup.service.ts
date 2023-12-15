import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CustomDialogPopupComponent} from "../app/component/popup-type/custom-dialog-popup/custom-dialog-popup.component";
import {BasketComponent} from "../app/component/user-component/basket/basket.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(public dialog: MatDialog) {
  }

  open(title: string, component: any, custom: {height?: number, width?: number} = {height: 65, width: 60}) {
    this.dialog.closeAll();
    this.dialog.open(CustomDialogPopupComponent, {
      panelClass: ['header-list-popup', 'popup-container'],
      height: custom.height + '%',
      width: custom.width + '%',
      data: {title: title, component: component},
    });
  }
  openBasket(custom: {height?: number, width?: number} = {height: 65, width: 60}){
    this.dialog.closeAll();
    this.dialog.open(BasketComponent, {
      panelClass: ['header-list-popup', 'popup-container'],
      height: custom.height + '%',
      width: custom.width + '%',
    });
  }
  confirmOrder(custom: {height?: number, width?: number} = {height: 65, width: 60}){
    this.dialog.closeAll();
    this.dialog.open(BasketComponent, {
      panelClass: ['header-list-popup', 'popup-container'],
      height: custom.height + '%',
      width: custom.width + '%',
    });
  }
  closePopup(){
    this.dialog.closeAll()
  }
}
