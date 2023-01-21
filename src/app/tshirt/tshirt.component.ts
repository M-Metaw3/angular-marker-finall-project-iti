import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-tshirt',
  templateUrl: './tshirt.component.html',
  styleUrls: ['./tshirt.component.css']
})
export class TshirtComponent implements OnInit {

  // constructor() { }
  // products=[
  //   {"id":1 , "name":"Polo T-shirt" , "price":10000, "oprice":12000 ,"type":"NoDiscount","Disc":"Black T-shirt"},
  //   {"id":2 , "name":"Croc T-shirt" , "price":5000,"oprice":6000 ,"type":"Discount","Disc":"Blue T-shirt"},
  //   {"id":3 , "name":"HM t-shirt" , "price":6000,"oprice":6500 ,"type":"NoDiscount","Disc":"Red T-shirt"},
  //   {"id":4 , "name": "One T-shirt" , "price":1200,"oprice":1300 ,"type":"Discount","Disc":"Orange T-shirt"},
  //   {"id":5 , "name":"Polo T-shirt" , "price":10000 ,"oprice":12000 ,"type":"NoDiscount","Disc":"Coffe T-shirt"},

  // ]

  // ngOnInit(): void {
  // }
  
  constructor(private Service: ProductServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }
  goToProductDetails(productId: any) {
    this.router.navigate(['/home/t-shirts', productId,])
  }
  products: any[] = [];
  Tproducts: any[] = [];
  ttproducts: any[] = [6,7,8,9,10];
  ngOnInit(): void {
    this.Service.getMongoProducts().subscribe((receivedProducts) => {
      this.products = receivedProducts as Array<any>;
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        for(let i=0;i<this.products.length;i++){
          for(let l=0;l<this.ttproducts.length;l++){
          if(this.products[i].id == this.ttproducts[l] )
            this.Tproducts.push(this.products[i]);
          }
  
        }
        console.log(this.Tproducts);
        console.log(this.Tproducts[1].name);
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
  }
}
