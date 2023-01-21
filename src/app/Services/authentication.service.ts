import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl:string="http://localhost:3001/signUp";
  loginUrl:string="http://localhost:3001/login";
  accountsUrl:string="http://localhost:3001/accounts";
   constructor(private http:HttpClient) { }
  
   login(loginData:any):Observable<any>{
     return this.http.post(this.loginUrl,loginData).pipe(catchError((err)=>{
       return throwError(()=>(err.message || "Internal Server error"));
       }))
   }
  
   register(registData:any):Observable<any>{
    return this.http.post(this.registerUrl,registData).pipe(catchError((err)=>{
     return throwError(()=>(err.message || "Internal Server error"));
     }))
   }
  
   getMongoAccount(){
     return this.http.get(this.accountsUrl).pipe(catchError((err)=>{
       return throwError(()=>(err.message || "Internal Server error"));
       }));
  }
}