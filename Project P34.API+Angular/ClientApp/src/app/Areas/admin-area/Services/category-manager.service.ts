import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from 'src/app/Models/result.model';
import { Observable } from 'rxjs';
import { CategoryItem } from '../Models/category-item.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {


baseUrl = '/api/Category';
constructor(private http: HttpClient) {}

getAllCategories() {
  console.log(this.baseUrl);
  return this.http.get(this.baseUrl+'/getCategories');
}

removeCategory(id: string) {
  return this.http.post(this.baseUrl + '/removeCategory/' + id,  id , { headers: {'Content-Type': 'application/json'}});
}

getCategory(id: string) {
  return this.http.get(this.baseUrl + '/' + id);
}

editCategory(id: string, model: CategoryItem): Observable<ApiResult> {
  return this.http.post<ApiResult>(this.baseUrl + '/editCategory/' + id, model);
}

addCategory(model: CategoryItem): Observable<ApiResult> {
  return this.http.post<ApiResult>(this.baseUrl + '/addCategory', model);
}

}
