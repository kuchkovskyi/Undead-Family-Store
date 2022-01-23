import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = '/api/Category';
  url2 = '/api/SubCategory';
  constructor(private http: HttpClient) {}
  
  getAllCategories() {
    
    return this.http.get(this.baseUrl+'/getCategories');
  }
  
  getCategory(id: string) {
    return this.http.get(this.baseUrl + '/' + id);
  }
  
  subcategoriesFromCategory(idCategory: string){
    return this.http.get(this.url2 + '/getCategoriesWithSub/'+idCategory);
  }
  
}
 
  
