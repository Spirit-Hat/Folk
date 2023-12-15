import {ProductDTO} from "../interface/product";

export enum EDeliveryType {
  UKR_POSHTA ='Доставка Укр. Пошта',
  NOVA_POSHTA = "Доставка Нова Пошта",
  SELF_PICKUP = "Самовивіз з відділення",
}
export enum EOrderStatus {
  ACCEPTED = "Прийнято",
  CANCELED = "Відхилено",
  PAID = "Проплачено",
  COMPLETED = 'Опрацьовано'

}
export interface PersonDTO{
  id: number,
  login?: string,
  firstName: string,
  lastName: string,
  email?: string,
  phone?: string,
}
export interface ProductOrderDTO{
  id: number,
  totalAmount: number,
  totalPrice: number,
  settlement: string,
  streetAddress: string,
  eDeliveryType: EDeliveryType,
  orderDate: string,
  productList: AcceptedProduct[],
  orderStatus: EOrderStatus,
  person: PersonDTO,
  userId: number,
}

export interface AcceptedProduct{
  amount: number,
  name: string,
  previewImage: string,
  price: number,
  productIds: number,
}
