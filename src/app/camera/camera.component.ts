import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor(private Service: ProductServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }
 
  products: any[] = [];
  Tproducts: any[] = [];
  ttproducts: any[] = [1,2,3,4,5];
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
