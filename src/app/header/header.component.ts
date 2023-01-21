import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { SigninService } from '../Services/signin.service';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ProductsService:ProductsService, public sin:SigninService,private cartService:CartServiceService) { }
  welcome:string="";
  newproduct:any=[];

  productsCount:number=0;

  searchtext:string=''
  onsearchtextenrt(searchvalue:string){
    this.searchtext=searchvalue;
    console.log(this.searchtext);
  }

  ngOnInit(): void {
    this.sin.homeWelcome$.subscribe(data => {
      console.log("in subs....: ", data);
      this.welcome = data;

      //get products count
    this.cartService.productsCount$.subscribe((data)=>{
      this.productsCount = data;
    })
    });
   // this.newproduct=this.ProductsService.getAllProduct();
   // currentUser=JSON.stringify(sessionStorage.getItem("currentUser"));
  }
}
