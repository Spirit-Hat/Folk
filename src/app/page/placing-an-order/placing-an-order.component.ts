import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertTips} from "../../../service/alertTips";
import {BasketStorageService} from "../../../service/basketStorage.service";
import {ProductDTO} from "../../../interface/product";
import {PopupService} from "../../../service/popup.service";
import {SVG} from "../../../environments/environment";
import {API} from "../../../service/api/API";
import {Router} from "@angular/router";

export enum ETypeDelivery {
  SELF_PICKUP = 'SELF_PICKUP',
  NOVA_POSHTA = 'NOVA_POSHTA',
  UA_POSHTA = 'UKR_POSHTA'
}

export interface order {
  totalAmount: string,
  totalPrice: string,
  settlement?: string,
  streetAddress?: string,
  eDeliveryType: ETypeDelivery,
  productList: [{
    productIDs: number,
    amount: number
  }]
}

export interface person {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
}

@Component({
  selector: 'fc-placing-an-order',
  templateUrl: './placing-an-order.component.html',
  styleUrls: ['./placing-an-order.component.scss']
})

export class PlacingAnOrderComponent implements OnInit {

  constructor(
    private basketService: BasketStorageService,
    private popup: PopupService,
    private api: API,
    private router:Router,
  ) {
  }

  public svg = SVG;
  public auth: boolean = !!localStorage.getItem('jwt-token');
  public authStatus: boolean = false;
  public anotherPerson: boolean = false;

  public formAlertControl = new AlertTips();
  public mainForm: FormGroup | any;
  public orderList: ProductDTO[] = this.basketService.getProducts();
  public client: person | any;
  public clientForm: FormGroup | any;

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      'firstName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)]),
      'lastName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      'phone': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'),
      ]),
    })
    localStorage.getItem('client') ? this.clientForm.setValue(JSON.parse(<string>localStorage.getItem('client'))) : ''
    this.mainForm = new FormGroup({
      'client': this.clientForm,
      'eDeliveryType': new FormControl(null, [Validators.required]),
      'totalPrice': new FormControl(null),
      'totalAmount': new FormControl(null),
    });
    this.getTotalResult();
  }

  get firstName() {
    return this.clientForm.get('firstName');
  }

  get lastName() {
    return this.clientForm.get('lastName');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get phone() {
    return this.clientForm.get('phone');
  }

  get eDeliveryType() {
    return this.mainForm.get('eDeliveryType')
  }

  get totalPrice() {
    return this.mainForm.get('totalPrice')
  }

  get totalAmount() {
    return this.mainForm.get('totalAmount')
  }

  getTotalResult() {
    this.totalAmount.value = this.orderList.length;
    this.orderList.forEach((product: ProductDTO) => {
      this.totalPrice.value += (product.userAmount || 1) * product.price
    })
  }

  confirmOrder() {
    console.log(this.mainForm.getRawValue())
    this.router.navigate(['']);

    const token = localStorage.getItem('jwt-token');
    console.log(token)
    if (token) {
      console.log("I am work ")
      this.api.newOrderSave(this.mainForm.getRawValue()).subscribe({
        error: error => console.log(error),
        next: () => {
          console.log('success');
          this.basketService.clearProducts();
        }
      })
    } else {

      this.api.newSaveWithoutToken(this.mainForm.getRawValue()).subscribe({
        error: error => console.log(error),
        next: () => {
          console.log('success');
        }
      })

    }

  }

  editOrder() {
    this.popup.openBasket();
  }

  saveClientsLocalData() {
    if (this.clientForm.invalid) return;
    localStorage.setItem('client', JSON.stringify(this.clientForm.getRawValue()))
  }
}
