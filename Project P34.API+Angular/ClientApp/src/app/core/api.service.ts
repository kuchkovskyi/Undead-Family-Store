import { SignInModel } from './../Models/login.model';
import { RegisterModel } from './../Models/register.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../Models/result.model';
import { SupportModel } from '../Models/support.model';
import { UserItem } from '../Areas/user-area/personal-room/models/user-item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/Account';
  supportURL = '/api/Support'
  loginStatus = new EventEmitter<boolean>();

  SingUp(UserRegisterDto: RegisterModel): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + '/register', UserRegisterDto);
  }

  SignIn(UserLoginDto: SignInModel) {
    return this.http.post<ApiResult>(this.baseUrl + '/login', UserLoginDto);
  }

  

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token !== null) {

      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);

      if (decodedJwtData.roles === 'User') {
        return false;
      } else if (decodedJwtData.roles === 'Admin') {
        return true;
      }

    } else {
      return false;
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  }

  Logout () {
    localStorage.removeItem('token');
    this.loginStatus.emit(false);
  }
  
  GoogleLogin () {
    return this.http.get<ApiResult>(this.baseUrl + '/google-login');
  }

  FacebookLogin() {
    return this.http.get<ApiResult>(this.baseUrl + '/facebook-login');
  }

  SupportRequest(model: SupportModel){
    return this.http.post<ApiResult>(this.supportURL + '/AddRequest', model);

  }


}
