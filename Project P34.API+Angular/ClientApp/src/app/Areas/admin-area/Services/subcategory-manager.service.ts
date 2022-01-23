import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from 'src/app/Models/result.model';
import { Observable } from 'rxjs';
import { SubcategoryItem } from '../Models/subcategory-item.model';
@Injectable({
  providedIn: 'root'
})
export class SubcategoryManagerService {

  baseUrl = '/api/SubCategory';
constructor(private http: HttpClient) { }

getAllSubCategories() {
  return this.http.get(this.baseUrl+'/getSubCategories');
}

removeSubCategory(id: string) {
  return this.http.post(this.baseUrl + '/removeSubCategory/' + id,  id , { headers: {'Content-Type': 'application/json'}});
}

getSubCategory(id: string) {
  return this.http.get(this.baseUrl + '/' + id);
}

// editCategory(id: string, model: CategoryItem): Observable<ApiResult> {
//   return this.http.post<ApiResult>(this.baseUrl + '/editProduct/' + id, model);
// }

addSubCategory(model: SubcategoryItem): Observable<ApiResult> {
  return this.http.post<ApiResult>(this.baseUrl + '/addSubCategory/', model);
}


}
