import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { CartServiceService } from '../Services/cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private Service: ProductServiceService, private activatedRoute: ActivatedRoute, private router: Router,private titleService:Title,private cartService:CartServiceService, private _snackBar: MatSnackBar) {
    this.titleService.setTitle("Details");
   }
  products: any[] = [];
  productid: any
  selectedProduct: any;

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
    this.Service.getMongoProducts().subscribe((receivedProducts) => {
      this.products = receivedProducts as Array<any>;
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.productid = params.get("id");
        for(let i=0;i<this.products.length;i++){
          if(this.productid==this.products[i].id){
            this.selectedProduct=this.products[i];
            break;
          }
        }
        console.log(this.productid);
        console.log(this.selectedProduct);
      })
    },
      (err) => {
        console.log("there is an error in laoding products in home!")
      })

  };

}
