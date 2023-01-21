import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartServiceService } from '../Services/cart-service.service';
import { ProductServiceService } from '../services/product-service.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {

  constructor(private productService: ProductServiceService, private cartService: CartServiceService, private titleService:Title,private route:Router) {
    //setting page title
    this.titleService.setTitle("Cart");
   }

  listOfPurchasedProducts$ids: any[] = [];
  listOfAllProducts: any[] = [];
  listOfPurchasedProducts: any[] = [];
  productDetails: { id: Number, name: string, price: Number, quantity: Number }[] = [];
  loginState:boolean = false;

  //laoding actual products in cart
  loadingProductsToCart = () => {
    for (const productId of this.listOfPurchasedProducts$ids) {
      this.listOfPurchasedProducts.push(this.listOfAllProducts.find(product => product.id == productId));
    }
  }


  //>>in/decreasing Product Quantity
  pQuantity(V: any) {
    let button = $(V);
    console.log(button);
    let oldValue = button.parent().parent().find('input').val();
    let Product_price = +button.parent().parent().parent().parent().find('.PPrice').text().slice(1);
    let ID = button.attr("PID");

    if (button.hasClass('btn-plus')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find('input').val(newVal);
    button.parent().parent().parent().parent().find('.totalP').text(`$${+newVal * Product_price}`);
    this.updatePQuantity(ID,newVal);
  }

  //remove product from cart
  removeProductFC = (pId: any) => {
    console.log("deleted");
    this.cartService.removeProduct(pId);
    //get listOfPurchasedProducts from sessionStorage
    this.listOfPurchasedProducts$ids = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.listOfPurchasedProducts = [];
    this.loadingProductsToCart();
    //update total
    this.productDetails.forEach(element => {
      if(element.id == pId)
      {
        this.productDetails.splice(this.productDetails.indexOf(element),1);
      }
    });
    sessionStorage.setItem('cartWDetails', JSON.stringify(this.productDetails));
    this.CART_SUMMARY();
  }

  //update product quantaty in session storage
  updatePQuantity = (id:number,quantaty:number)=>{
    this.productDetails.forEach(element => {
      if(element.id == id)
      {
        element.quantity = quantaty;
      }
    });
    sessionStorage.setItem('cartWDetails', JSON.stringify(this.productDetails));
    this.CART_SUMMARY();
  }

  //loading products with details in session storage
  loadProductsWD = () => {
    for (const product of this.listOfPurchasedProducts) {
      let productWD = (({ id, name, price }) => ({ id, name, price, quantity: 1 }))(product);
      this.productDetails.push(productWD);
    }
    sessionStorage.setItem('cartWDetails', JSON.stringify(this.productDetails));
    this.CART_SUMMARY();
  }

  CART_SUMMARY() {
    let cartWDetails = JSON.parse(sessionStorage.getItem('cartWDetails')!) || [];
    let total:any = 0;
    for (const element of cartWDetails) {
      total += element.price * element.quantity;
    }
    document.getElementById('subTotalPDisplay')!.innerText = `$${total}`;
    document.getElementById('totalPDisplay')!.innerText = `$${total+10}`;
  }

  proceedToCheckOut = ()=>{
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!) || [];
    if(userData.length > 0)
    {
      this.loginState = false;
      this.route.navigate(['/checkout']);
    }
    else
    {
      this.loginState = true;
      setTimeout(() => {
        this.loginState = false;
      }, 1000);
    }
  }


  ngAfterViewInit() {
  }

  ngOnInit(): void {
    //get listOfPurchasedProducts from sessionStorage
    this.listOfPurchasedProducts$ids = JSON.parse(sessionStorage.getItem('cart')!) || [];

    //loading products from database
    this.productService.getMongoProducts().subscribe((receivedProducts) => {
      this.listOfAllProducts = receivedProducts as Array<any>;

      //laoding actual products in cart
      this.loadingProductsToCart();

      //loading products with details in session storage
      this.loadProductsWD();
    },
      (err) => {
        console.log("there is an error in laoding products in cart!")
      })
  }
}
