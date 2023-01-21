import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  listOfPurchasedProducts:any[] = JSON.parse(sessionStorage.getItem('cart')!)||[];

  public productsCount = new BehaviorSubject<number>(this.listOfPurchasedProducts.length);
  // Create an observable to watch the subject
  public productsCount$ = this.productsCount.asObservable();

  constructor() { }

  // Add products to cart array(listOfPurchasedProducts) & cart in session storage
  addProductsToCard = (id:number)=>{
    this.listOfPurchasedProducts.push(id);
    sessionStorage.setItem('cart',JSON.stringify(this.listOfPurchasedProducts));
    this.updateProductsCount();
  }

  // update products count in header
  updateProductsCount = ()=>{
    let retrievedCart = JSON.parse(sessionStorage.getItem('cart')!);
    this.productsCount.next(retrievedCart.length);
  }

  //remove product
  removeProduct = (pId:any) =>{
    this.listOfPurchasedProducts.splice(this.listOfPurchasedProducts.indexOf(pId),1);
    sessionStorage.setItem('cart',JSON.stringify(this.listOfPurchasedProducts));
    this.updateProductsCount();
  }
}
