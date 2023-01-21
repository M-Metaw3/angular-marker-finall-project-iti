import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { __values } from 'tslib';
import { ProductServiceService } from '../services/product-service.service';
import { Title } from "@angular/platform-browser";
import { CartServiceService } from '../Services/cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})


export class ShopComponent implements OnInit {

  priceSections: Array<any> = [{ title: "All Price"}, { title: "$0 - $100", count: 0 }, { title: "$100 - $200", count: 0 }, { title: "$200 - $300", count: 0 }, { title: "$300 - $400", count: 0 }, { title: "$400 - $500", count: 0 }];
  colorSections: Array<any> = [{ title: "All Color"}, { title: "Black", count: 0 }, { title: "White", count: 0 }, { title: "Red", count: 0 }, { title: "Blue", count: 0 }, { title: "Green", count: 0 }];
  sizeSections: Array<any> = [{ title: "All Size"}, { title: "XS", count: 0 }, { title: "S", count: 0 }, { title: "M", count: 0 },{ title: "L", count: 0 }, { title: "XL", count: 0 }];
  priceForm: FormGroup;
  colorForm: FormGroup;
  sizeForm: FormGroup;
  allProducts: Array<any> = [];
  resultFilter = new Set<any>([]);
  priceFilter = new Set<any>([]);
  colorFilter = new Set<any>([]);
  sizeFilter = new Set<any>([]);
 priceQuery:Array<string>=[];
  colorQuery:Array<string>=[];
  sizeQuery:Array<string>=[];
  
  finalpriceQuery="";
  finalcolorQuery="";
  finalsizeQuery="";
  limit:number=10;
  currentPage:number=1;

  constructor(private fb: FormBuilder, private router: Router, private ps:ProductServiceService,private titleService: Title,private cartService:CartServiceService, private _snackBar: MatSnackBar) {
    //setting page title
    this.titleService.setTitle("Shop");

    this.priceForm = fb.group({
      selectedPrices: new FormArray([new FormControl("All Price")]),
    });
    this.colorForm = fb.group({
      selectedColors: new FormArray([new FormControl("All Color")]),
    });
    this.sizeForm = fb.group({
      selectedSizes: new FormArray([new FormControl("All Size")]),
    });

    this.allProducts = JSON.parse(localStorage.getItem("allProducts") || '{}');
    this.allProducts.forEach((p) => {
      this.resultFilter.add(p.id);
      this.priceFilter.add(p.id);
      this.colorFilter.add(p.id);
      this.sizeFilter.add(p.id);

      if (p.price > 0 && p.price < 100) {
        this.priceSections[1].count++;
      } else if (p.price > 100 && p.price < 200) {
        this.priceSections[2].count++;
      } else if (p.price > 200 && p.price < 300) {
        this.priceSections[3].count++;
      } else if (p.price > 300 && p.price < 400) {
        this.priceSections[4].count++;
      } else if (p.price > 400 && p.price < 500) {
        this.priceSections[5].count++;
      }

      switch (p.size) {
        case 'XS':
          this.sizeSections[1].count++;
          break;
        case 'S':
          this.sizeSections[2].count++;
          break;
        case 'M':
          this.sizeSections[3].count++;
          break;
        case 'L':
          this.sizeSections[4].count++;
          break;
        case 'XL':
          this.sizeSections[5].count++;
          break;
      }

      switch (p.color) {
        case 'black' :
          this.colorSections[1].count++;
          break;
        case 'white':
          this.colorSections[2].count++;
          break;
        case 'red':
          this.colorSections[3].count++;
          break;
        case 'blue':
          this.colorSections[4].count++;
          break;
        case 'green':
          this.colorSections[5].count++;
          break;
      }
    })
  }
  goToProductDetails(productId: any) {
    this.router.navigate(['/home/t-shirts', productId,])
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
    this.changeShowing();
  }

  onPriceFilterChange(event: any) {
    const selectedPrices = (this.priceForm.controls['selectedPrices'] as FormArray);
    if (event.target.checked) {
      selectedPrices.push(new FormControl(event.target.id));
    } else {
      const index = selectedPrices.controls
        .findIndex(x => x.value === event.target.id);
      selectedPrices.removeAt(index);
    }
    this.filter("price");
  //   this.filterInMongo("price");

  }

  onColorFilterChange(event: any) {
    const selectedColors = (this.colorForm.controls['selectedColors'] as FormArray);
    if (event.target.checked) {
      selectedColors.push(new FormControl(event.target.id));
    } else {
      const index = selectedColors.controls
        .findIndex(x => x.value === event.target.id);
      selectedColors.removeAt(index);
    }
    this.filter("color");
    // this.filterInMongo("color");
  }

  onSizeFilterChange(event: any) {
    const selectedSizes = (this.sizeForm.controls['selectedSizes'] as FormArray);
    if (event.target.checked) {
      selectedSizes.push(new FormControl(event.target.id));
    } else {
      const index = selectedSizes.controls
        .findIndex(x => x.value === event.target.id);
      selectedSizes.removeAt(index);
    }
    this.filter("size");
   // this.filterInMongo("size");
  }

 /* 
  filterInMongo(key:string) {
    this.resultFilter.clear();
    switch (key) {
      case "price":
        let seletedP = new Set(this.priceForm.get("selectedPrices")?.value);
        this.priceQuery=[];
        if (seletedP.has("All Price") || seletedP.size==0) {
          this.finalpriceQuery="";
        }else{
            if (seletedP.has("$0 - $100")) {
                this.priceQuery.push("{price: {$gt : 0}, price: {$lt:100}}");
            }
            if (seletedP.has("$100 - $200")) {
              this.priceQuery.push("{price: {$gt : 100}, price: {$lt:200}}");
            }
            if (seletedP.has("$200 - $300")) {
              this.priceQuery.push("{price: {$gt : 200}, price: {$lt:300}}");
            }
            if (seletedP.has("$300 - $400")) {
              this.priceQuery.push("{price: {$gt : 300}, price: {$lt:400}}");
            }
            if (seletedP.has("$400 - $500")) {
              this.priceQuery.push("{price: {$gt : 400}, price: {$lt:500}}");
            }
        }
        break;

      case "color":
        let selectedC = new Set(this.colorForm.get("selectedColors")?.value);
        this.colorQuery=[];
        if (selectedC.has("All Color") || selectedC.size==0 ) {
             this.finalcolorQuery="";
       }else{
            if (selectedC.has("Red")) {
              this.colorQuery.push("{color:'red'}");
            }
           if (selectedC.has("Green")) {
              this.colorQuery.push("{color:'green'}");
            }
           if (selectedC.has("Blue")) {
              this.colorQuery.push("{color:'blue'}");
            }
           if (selectedC.has("White")) {
              this.colorQuery.push("{color:'white'}");
            }
           if (selectedC.has("Black")) {
              this.colorQuery.push("{color:'black'}");
            }
          }
        
        break;
      case "size":
        let selectedS = new Set(this.sizeForm.get("selectedSizes")?.value);
        this.sizeQuery=[];
        if (selectedS.has("All Size") || selectedS.size==0) {
          this.finalsizeQuery="";
       }else{
            if (selectedS.has("XS")) {
              this.sizeQuery.push("{size:'XS'}");
            }
           if (selectedS.has("S")) {
              this.sizeQuery.push("{size:'S'}");
            }
             if (selectedS.has("M")) {
              this.sizeQuery.push("{size:'M'}");
            }
             if (selectedS.has("L")) {
              this.sizeQuery.push("{size:'L'}");
            }
             if (selectedS.has("XL")) {
              this.sizeQuery.push("{size:'XL'}");
            }
        }
        break;
    }

    var total=""
    if(this.priceQuery.length==0){
      this.finalpriceQuery="";
    }else if(this.priceQuery.length==1){
      this.finalpriceQuery=this.priceQuery[0];
    }else{
      total="";
      this.priceQuery.forEach((item)=>{
        if(total==""){
          total=item;
        }else{
        total=total+","+item;
        }
    });
      this.finalpriceQuery=`{$or:[${total}]}`;
    }

    if(this.colorQuery.length==0){
      this.finalcolorQuery="";
    }else{
      total=""
      this.colorQuery.forEach((item)=>{
        if(total==""){
          total=item;
        }else{
        total=total+","+item;
        }
    });
      this.finalcolorQuery=`{$or:[${total}]}`;
    }

    if(this.sizeQuery.length==0){
      this.finalsizeQuery="";
    }else{
      total=""
      this.sizeQuery.forEach((item)=>{
        if(total==""){
          total=item;
        }else{
        total=total+","+item;
        }
      });
      this.finalsizeQuery=`{$or:[${total}]}`;
    }

    this.changeShowing();
  }
  */

  filter(key:string) {
    this.resultFilter.clear();
    switch (key) {
      case "price":
        let seletedP = new Set(this.priceForm.get("selectedPrices")?.value);
        if (seletedP.has("All Price") || seletedP.size==0) {
           this.priceFilter.clear();
           this.allProducts.forEach(product=>this.priceFilter.add(product.id));
        }else{
          this.priceFilter.clear()
          this.allProducts.forEach((product) => {
            if (seletedP.has("$0 - $100")// && product.price > 0 && product.price < 100
            ) {
                this.priceQuery.push("{price: {$gt : 0}, price: {$lt:201}}");
              this.priceFilter.add(product.id);
            }
            else if (seletedP.has("$100 - $200") && product.price>100 && product.price<200) {
              this.priceFilter.add(product.id);
            }
            else if (seletedP.has("$200 - $300") && product.price > 200 && product.price < 300) {
              this.priceFilter.add(product.id);
            }
            else if (seletedP.has("$300 - $400") && product.price > 300 && product.price < 400) {
              this.priceFilter.add(product.id);
            }
            else if (seletedP.has("$400 - $500") && product.price > 400 && product.price < 500) {
              this.priceFilter.add(product.id);
            }

          })
        }
        break;
      case "color":
        let selectedC = new Set(this.colorForm.get("selectedColors")?.value);
        if (selectedC.has("All Color") || selectedC.size==0 ) {
          this.colorFilter.clear();
          this.allProducts.forEach(product=>this.colorFilter.add(product.id));
       }else{
          this.colorFilter.clear();
          this.allProducts.forEach((product) => {
            if (selectedC.has("Red") && product.color == "red") {
              this.colorFilter.add(product.id);
            }
            else if (selectedC.has("Green") && product.color == "green") {
              this.colorFilter.add(product.id);
            }
            else if (selectedC.has("Blue") && product.color == "blue") {
              this.colorFilter.add(product.id);
            }
            else if (selectedC.has("White") && product.color == "white") {
              this.colorFilter.add(product.id);
            }
            else if (selectedC.has("Black") && product.color == "black") {
              this.colorFilter.add(product.id);
            }
          })
        }
        break;
      case "size":
        let selectedS = new Set(this.sizeForm.get("selectedSizes")?.value);
        if (selectedS.has("All Size") || selectedS.size==0) {
          this.sizeFilter.clear();
          this.allProducts.forEach(product=>this.sizeFilter.add(product.id));
       }else{
          this.sizeFilter.clear();
          this.allProducts.forEach((product) => {
            if (selectedS.has("XS") && product.size == "XS") {
              this.sizeFilter.add(product.id);
            }
            else if (selectedS.has("S") && product.size == "S") {
              this.sizeFilter.add(product.id);
            }
            else if (selectedS.has("M") && product.size == "M") {
              this.sizeFilter.add(product.id);
            }
            else if (selectedS.has("L") && product.size == "L") {
              this.sizeFilter.add(product.id);
            }
            else if (selectedS.has("XL") && product.size == "XL") {
              this.sizeFilter.add(product.id);
            }
          });
        
        }
        break;

    }

    this.priceFilter.forEach((pid) => {
      if (this.colorFilter.has(pid) && this.sizeFilter.has(pid)) {
        this.resultFilter.add(pid);
      }
    });
      console.log("result of filter = ", this.resultFilter);
  }

  changeShowing(){
    this.ps.getMongoProductsPaginate(this.currentPage,this.limit,this.finalpriceQuery,this.finalcolorQuery,this.finalsizeQuery).subscribe((response)=>{
      console.log(response);
    },(err)=>{
      console.log("An error when get product paginate ,"+ err);
    })
  }

  changeLimit(newLimit:number){
    this.limit=newLimit;
    this.changeShowing();
  }

  changeCurrentPage(newPage:number){
    this.currentPage=newPage;
    this.changeShowing()
  }
  
  
}