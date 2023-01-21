import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  fname = "";
  lname: string = "";
  email: string = "";
  mobile: string = "";
  address1: string = "";
  address2: string = "";
  country: string = "";
  city: string = "";
  state: string = "";
  zipcode: string = "";

  constructor(private titleService: Title) {
    //setting page title
    this.titleService.setTitle("Checkout");
  }
  productsDetails: { id: number, name: string, price: number, quantity: number }[] = [];
  total: number = 0;

  showTotal = () => {
    for (const product of this.productsDetails) {
      this.total += product.price * product.quantity;
    }
    document.getElementById('checkoutSubtotaldisplay')!.innerText = `$${this.total}`;
    document.getElementById('checkoutTotaldisplay')!.innerText = `$${this.total + 10}`;
  }

  ngOnInit(): void {
    var currentUser = sessionStorage.getItem("currentUser");

    if (currentUser != null) {
      var user;
      user = JSON.parse(currentUser);
      this.fname = user[0].firstname;
      this.lname = user[0].lastname;
      this.email = user[0].email;
      this.mobile = user[0].mobileNo;
      this.address1 = user[0].address1;
      this.address2 = user[0].address2;
      this.country = user[0].country;
      this.city = user[0].city;
      this.state = user[0].state;
      this.zipcode = user[0].zipcode;
    }

    //get products from sessionStorage
    this.productsDetails = JSON.parse(sessionStorage.getItem('cartWDetails')!) || [];

    //show total
    this.showTotal();
  }
}
