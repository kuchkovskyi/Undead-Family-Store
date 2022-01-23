import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../../../../src/app/Models/result.model';
import { Observable } from 'rxjs';
import { ForgotPasswordModel } from '../Model/forgot-password.model';


@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    
    baseUrl = '/api/Account';



    constructor(private http: HttpClient){

    }


    recoverPassword(model: ForgotPasswordModel): Observable<ApiResult>{
        return this.http.post<ApiResult>(this.baseUrl + '/recoverPassword/', model);
    }

    














}