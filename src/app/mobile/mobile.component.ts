import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  constructor(private Service: ProductServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }
  products: any[] = [];
  Tproducts: any[] = [];
  ttproducts: any[] = [16,17,18,19,20];
  goToProductDetails(productId: any) {
    this.router.navigate(['/home/t-shirts', productId,])
  }
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
