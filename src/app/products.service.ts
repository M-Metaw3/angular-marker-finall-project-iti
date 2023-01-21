import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  products=[
    {"id":1 , "name":"Dell" },
    {"id":2 , "name":"Sony" },
    {"id":3 , "name":"Toshiba" },
    {"id":4 , "name": "Acer" },
    {"id":5 , "name":"Lenovo" },
    {"id":6 , "name":"Polo T-shirt" },
    {"id":7 , "name":"Croc T-shirt" },
    {"id":8 , "name":"HM t-shirt" },
    {"id":9 , "name": "One T-shirt" },
    {"id":10 , "name":"Polo T-shirt" },
  ]
  getAllProduct(){
    return this.products;
  }
}
