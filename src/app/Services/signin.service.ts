import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SigninService {
 value:any="";
  constructor() { 
    this.fd();
  }
  
  public homeWelcome=new BehaviorSubject<string>("");
  public homeWelcome$ = this.homeWelcome.asObservable();
  public signin = new BehaviorSubject<boolean>(false);
  public signin$ = this.signin.asObservable();
  public signup = new BehaviorSubject<boolean>(false);
  public signup$ = this.signup.asObservable();

setSignin(newStringVar: boolean) {
    this.signin.next(newStringVar);
  }
setSignup(newStringVar: boolean) {
  this.signup.next(newStringVar);
  }

 fd =()=>{
    this.value=JSON.parse(sessionStorage.getItem("currentUser")!);
    console.log("valllllllll",this.value);
    if(this.value==null)
    {
      this.homeWelcome.next("");
      console.log("null heeeeeeeeere");
    }else{
      console.log("not null heeeeeeeeeere");
      this.homeWelcome.next(`Welcome ${this.value.lastname}`);
    }
  }

  

  setWelcome(user_lastName: string) {
    console.log("hhhhhhhhhhhhh",user_lastName);
    this.homeWelcome.next(`Welcome ${user_lastName}`);
  }
  
}

