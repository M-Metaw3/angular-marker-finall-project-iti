import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';
import { CartServiceService } from '../Services/cart-service.service';
import {Title} from "@angular/platform-browser";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private Service:ProductServiceService , private cartService:CartServiceService , private titleService:Title, private _snackBar: MatSnackBar ,private router: Router) { 
    //setting page title
    this.titleService.setTitle("Home");
  }
  
  
  //loading random products
  products:any []=[];
  randomProducts = (receivedProducts:any)=>{
    let arr:number[]=[];
    for (let i = 0; i < 8; i++) {
      let random:number = Math.floor(Math.random()*39);
      while(arr.includes(random))
      {
        random = Math.floor(Math.random()*39);
      }
      arr.push(random);
      this.products.push(receivedProducts[random])
    }
    for (const iterator of arr) {
      console.log(iterator);
    }
  }
  

  goToProductDetails(productId: any) {
    this.router.navigate(['/home', productId,])
  }

  //add products to cart
  addedProducts:any[]=[];
  addProducts = (productId:number) =>{
    if(!this.addedProducts.includes(productId))
    {
      this.addedProducts.push(productId);
      this.cartService.addProductsToCard(productId);
      console.log("added");//test
      this.openSnackBar("Product added to cart!","ok");
    }
  }

  //alerting
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  ngOnInit(): void {
    arrOfProduct:Array<any>;
    this.Service.getMongoProducts().subscribe((receivedProducts)=>{
      localStorage.setItem("allProducts",JSON.stringify(receivedProducts));
      this.randomProducts(receivedProducts);
      
    },
    (err)=>{
      console.log("there is an error in laoding products in home!")
    })
  
  }

}
