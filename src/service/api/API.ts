import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable,} from "rxjs";
import {ProductdDTO} from "./ProductdDTO";
import {Category} from "./Category";
import {environment} from "../../environments/environment";
import {ProductOrderDTO} from "../../models/Order";
import {ProductDTO} from "../../interface/product";


@Injectable({
  providedIn: 'root'
})
export class API {

  private BACKEND = environment.BACKEND_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  sendProduct(body: any): Observable<any> {
    let type;

    console.log(body)

    const formData = new FormData();
    console.log(body.status, 'fwfw')
    console.log()
    body.file.forEach((imgByte: string) => {
      const typeImg = body.file[0].match("(?<=data:image\\/)[^;]+")
      type = typeImg ? typeImg[0] : ''
      const fullType = 'image/' + type;

      const base64 = imgByte.split(';base64,').pop();
      if (base64) {
        const binaryString = atob(base64);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let j = 0; j < binaryString.length; j++) {
          uint8Array[j] = binaryString.charCodeAt(j);
        }

        const blobs = new Blob([uint8Array], {type: fullType});
        const fileS = new File([blobs], "test." + type, {type: fullType});
        formData.append('file', fileS);
      }
    });

    formData.append('product', JSON.stringify(body.product));
    formData.append('category', body.category);
    formData.append('status', body.status);

    console.log(formData.get('file'))
    console.log(formData)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')

    return this.http.post(`${this.BACKEND}/image/upload/product`, formData, {headers})
  }

  getListOfProduct(): Observable<ProductdDTO[]> {
    return this.http.get<ProductdDTO[]>(`${this.BACKEND}/search/by/product`);
  }

  searchProducts(searchValue: string): Observable<ProductdDTO[]> {
    const formData = new FormData();
    formData.append('search', searchValue);
    return this.http.post<ProductdDTO[]>(`${this.BACKEND}/search/by`, formData)
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BACKEND}/search/allcategory`);
  }

  getDataById(id: number): Observable<ProductdDTO[]> {
    // const url = `http://localhost:8080/search/test?id=${id}`;
    return this.http.get<ProductdDTO[]>(`${this.BACKEND}/search/test?id=${id}`);

    // return this.http.get(url);
  }

  getOrderList(): Observable<ProductOrderDTO[]> {
    return this.http.get<ProductOrderDTO[]>(`${this.BACKEND}/order/list`)
  }

  getListOfOrdersByUser(): Observable<ProductOrderDTO[]> {
    const headers = new HttpHeaders({'Authorization': `Bearer`});

    return this.http.get<ProductOrderDTO[]>(`${this.BACKEND}/order/user/list`,{headers})
  }


  saveCategory(data: string): Observable<string> {

    const formData = new FormData();
    formData.append('category', data);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')

    return this.http.post<string>(`${this.BACKEND}/category/save`, formData, {headers, responseType: 'text' as 'json'})
  }

  updateCategory(id: any, newName: string) {
    console.log(id + "Value" + newName)
    const formData = new FormData();
    formData.append('id', id);
    formData.append('category', newName);

    return this.http.put(`${this.BACKEND}/category/update`, formData, {responseType: 'text' as 'json'})
  }

  deleteCategory(id: any) {

    return this.http.delete(`${this.BACKEND}/category/delete/${id}`, {responseType: 'text' as 'json'})
  }

  getProductById(id: any): Observable<ProductDTO> {

    return this.http.get<ProductDTO>(`${this.BACKEND}/search/getbyid/${id}`)
  }

  newOrderSave(body: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': `Bearer`});

    // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.BACKEND}/order/save`, body,{headers});

  }

  newSaveWithoutToken(body: any): Observable<any>{
    // const headers = new HttpHeaders({'Authorization': `Bearer`});

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.BACKEND}/order/save/without/token`, body,{headers});

  }




  getListOfFavoriteUser(): Observable<ProductdDTO[]> {
    const headers = new HttpHeaders({'Authorization': `Bearer`});

    return this.http.get<ProductdDTO[]>(`${this.BACKEND}/favorire/get/all_product`,{headers});
  }

  addnewFavoriteProduct(productId : any ){

    const headers = new HttpHeaders({'Authorization': `Bearer`});

     this.http.post(`${this.BACKEND}/favorire/save/${productId}`,{},{headers}) .subscribe(
      () => {
        console.log('Product saved successfully.');
      },
      (error) => {
        console.error('Failed to save product:', error);
      }
    );

  }
}
