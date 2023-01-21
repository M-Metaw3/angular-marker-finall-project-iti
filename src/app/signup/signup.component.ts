import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ForbiddenNameValidator } from '../firstnameValidtor';
import { passwordAspassword } from '../passwordAspassword';

import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { SigninService } from '../Services/signin.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent implements OnInit {
  state?: boolean;
  userData:any;
  constructor(
    private formsignup: FormBuilder,
    private users: AuthenticationService,
    private router: Router,
    public sin:SigninService
  ) {}
  // signUpform = new FormGroup({
  //   FirtName: new FormControl(''),
  //   LastName: new FormControl(''),
  //   Email: new FormControl(''),
  //   MobileNo: new FormControl(''),
  //   Password: new FormControl(''),
  //   RepeatPassword: new FormControl(''),
  //   AddressLine1: new FormControl(''),
  //   AddressLine2: new FormControl(''),
  // Country: new FormControl('',)
  //   City: new FormControl(''),
  //   State: new FormControl(''),
  //   ZipCode: new FormControl(''),


  signUpform = this.formsignup.group(
    {
      FirtName: [
        '',
        [Validators.required, ForbiddenNameValidator(/admin|adminstrator/)],
      ],
      LastName: ['', Validators.required],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],

      MobileNo: [
        '',
        [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{5}')],
      ],
      Password: ['', Validators.required],
      RepeatPassword: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
    },
    { validator: [passwordAspassword] }
  );

  get FirtName() {
    return this.signUpform.get('FirtName');
  }
  get LastName() {
    return this.signUpform.get('LastName');
  }
  get Email() {
    return this.signUpform.get('Email');
  }
  get MobileNo() {
    return this.signUpform.get('MobileNo');
  }
  get Password() {
    return this.signUpform.get('Password');
  }
  get RepeatPassword() {
    return this.signUpform.get('RepeatPassword');
  }
  get AddressLine1() {
    return this.signUpform.get('AddressLine1');
  }
  get AddressLine2() {
    return this.signUpform.get('AddressLine2');
  }
  get City() {
    return this.signUpform.get('City');
  }
  get State() {
    return this.signUpform.get('State');
  }
  get ZipCode() {
    return this.signUpform.get('ZipCode');
  }
  get Country() {
    return this.signUpform.get('Country');
  }
  

  SignUp() {
    this.userData={
      firstname: this.FirtName?.value,
      lastname: this.LastName?.value,
      email: this.Email?.value,
      mobileNo: this.MobileNo?.value,
      password: this.Password?.value,
      address1: this.AddressLine1?.value,
      address2: this.AddressLine2?.value,
      country: this.Country?.value,
      city:this.City?.value,
      state: this.State?.value,
      ZIPcode: this.ZipCode?.value
    }
    return this.users
      .register(this.userData)
      .subscribe(
        (data) => {
          console.log('the result:', data);
          if (data.result == 'email already exist') {
            alert('Your email address already exist!');
          } else {
            sessionStorage.setItem('currentUser',JSON.stringify(this.userData));
            this.sin.setSignup(false);
           // this.sin.setWelcome(this.userData.lastname);
          }
        },
        (err) => {
          console.log('error :', err);
        }

      );
  }
 
  ngOnInit(): void { 
    this.sin.signup$.subscribe(data => {
      this.state = data;
    });
  }
  
  openSignin(){
    this.sin.setSignup(false);
    this.sin.setSignin(true);
  }
  close(){
    this.sin.setSignup(false);
  }
  
}

