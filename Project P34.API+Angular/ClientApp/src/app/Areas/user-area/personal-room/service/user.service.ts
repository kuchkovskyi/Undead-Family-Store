import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../Models/result.model';
import { UserItem } from '../models/user-item.model';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    url = '/api/UserManager';
    constructor(private http: HttpClient) { }

    getUser(id: string) {
        return this.http.get(this.url + '/' + id);
    }

    editUser(id: string, model: UserItem): Observable<ApiResult> {
      return this.http.post<ApiResult>(this.url + '/editUser' + '/' + id, model);
    }

    removeUser(id: string) {
      return this.http.post(this.url + '/RemoveUser/' + id,  id , { headers: {'Content-Type': 'application/json'}});
    }

   

  
}