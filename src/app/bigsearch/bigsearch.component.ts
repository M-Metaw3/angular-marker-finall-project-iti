import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
@Component({
  selector: 'app-bigsearch',
  templateUrl: './bigsearch.component.html',
  styleUrls: ['./bigsearch.component.css']
})
export class BigsearchComponent implements OnInit {

  constructor(private Service:ProductServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }
  products: any[] = [];
  newproducts: any[] = [];
  goToProductDetails(productId: any) {
    this.router.navigate(['/home/t-shirts', productId,])
  }
  ngOnInit(): void {
    this.Service.getMongoProducts().subscribe((receivedProducts) => {
      this.products = receivedProducts as Array<any>;
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        console.log(this.products);
      })
    },
      (err) => {
        console.log("there is an error in laoding products in home!")
      })
  };
  searchtext:string=''
  onsearchtextenrt(searchvalue:string){
    this.searchtext=searchvalue;
    console.log(this.searchtext);
    for(let i=0;i<this.products.length;i++){
      if(this.products[i].name.includes(this.searchtext)){
        this.newproducts.push(this.products[i])
      }
  }
  let uniqueChars = [...new Set(this.newproducts)];
  this.newproducts=uniqueChars;
  if(this.searchtext==''){
    this.newproducts=[];
  }
  }
     
}
