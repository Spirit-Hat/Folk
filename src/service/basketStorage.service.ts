import { Injectable } from '@angular/core';
import {ProductDTO} from "../interface/product";

@Injectable({
  providedIn: 'root'
})
export class BasketStorageService {
  private storageKey = 'products';

  constructor() {
  }

  getProducts(): ProductDTO[] {
    return JSON.parse(<string>localStorage.getItem(this.storageKey)) || [];
  }
  clearProducts(): void {
    localStorage.removeItem(this.storageKey);
  }
  addProduct(product: ProductDTO): void {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(productId: number): void {
    const products = this.getProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
  }

  setProductById(productId: number, updatedProduct: any): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index >= 0) {
      products[index] = { ...products[index], ...updatedProduct };
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  hasProductById(productId: number): boolean {
    const products = this.getProducts();
    return products.some(p => p.id === productId);
  }

  checkProductIsNotEmpty(): boolean{
    const productsString = localStorage.getItem(this.storageKey);
    return !!productsString && productsString != '[]';
  }

  getProductById(productId: number): ProductDTO {
    const products = this.getProducts();
    return products.filter(p => p.id == productId)[0];
  }
}
