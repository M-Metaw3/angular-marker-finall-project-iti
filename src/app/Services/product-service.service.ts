import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  addProductUrl:string="http://localhost:3001/addproduct";
  getProductsUrl:string="http://localhost:3001/getProducts";

  constructor(private http:HttpClient) { }

  addProductToMongo(product:any):Observable<any>{
    console.log("the product from user.service :",product);
     return this.http.post(this.addProductUrl,product).pipe(catchError((err)=>{
       return throwError(()=>(err.message || "Internal Server error"));
       }))
   }
 
   getMongoProducts(){
     return this.http.get(this.getProductsUrl).pipe(catchError((err)=>{
       return throwError(()=>(err.message || "Internal Server error"));
       }))
   }

   getMongoProductsPaginate(page:number,limit:number,priceQuery:any,colorQuery:any,sizeQuery:any){
    return this.http.get(this.getProductsUrl+`?page=${page}&limit=${limit}`,{params:{"priceQuery":priceQuery,"colorQuery":colorQuery,"sizeQuery":sizeQuery},}).pipe(catchError((err)=>{
      return throwError(()=>(err.message || "Internal Server error"));
      }))
  }
}
