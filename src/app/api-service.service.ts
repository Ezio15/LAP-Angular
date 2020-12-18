import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {ResponseModel} from "./model/responsemodel";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/elap/';

  login(loginPayload: any) : Observable<any> {
    console.log(loginPayload);
    return this.http.post<any>('http://localhost:8080/login' , loginPayload);
  }

  register(registerPayload: any) : Observable<ResponseModel> {
    console.log(registerPayload);
    return this.http.post<ResponseModel>('http://localhost:8080/' + 'register', registerPayload);
  }

}
