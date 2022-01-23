import { Injectable, EventEmitter } from '@angular/core';
import { ApiResult } from './../../../Models/result.model';
import { ProductItem } from './../Models/product-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagesItem } from '../Models/Images-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {
  
  baseUrl = '/api/Product';
  constructor(private http: HttpClient) { }


  

  getAllProducts() {
    return this.http.get(this.baseUrl + '/getProducts');
  }

  removeProduct(id: string) {
    return this.http.post(this.baseUrl + '/removeProduct/' + id, id);
  }
  // , { headers: {'Content-Type': 'application/json'}}

  getProduct(id: string) {
    return this.http.get(this.baseUrl + '/' + id);
  }

  editProduct(id: string, model: ProductItem): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + '/editProduct/' + id, model);
  }

  addProduct(model: ProductItem): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + '/addProduct', model);
  }



// addImageToProduct(model:ImagesItem, id:string){
// return this.http.post<ApiResult>(this.baseUrl+'/addImagesToProduct/'+id,model)
// }

  // addImageToProduct(model:ImagesItem, id:string){
  // return this.http.post<ApiResult>(this.baseUrl+'/addImagesToProduct/'+id,model)
  // }

}
