import { Component, ElementRef, HostListener, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { SigninService } from '../Services/signin.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['signin.component.css'],
  // template: `
  //   <button (click)="onClick($event)" id="test">Click</button>
  // `
})
export class SigninComponent implements OnInit, OnChanges{
  // @ViewChild('signinDiv') signinDiv: ElementRef<any>; 
  constructor(
    private formsign: FormBuilder,
    private users: AuthenticationService,
    private router: Router,
    public sin: SigninService,
    private r:Renderer2
  ) { }
 
  // @HostListener('document:click',['$event'])
  // clicsdsdsdkout(event:Event){
  //   if(this.signinDiv.contains(event.target)){
  //     console.log("inside");
  //   }else{
  //     console.log("outside");
  //   }
  // }
  state?: boolean;


  // siginform = new FormGroup({
  //   Email: new FormControl(''),
  //   Password: new FormControl(''),
  // })
  siginform = this.formsign.group({
    Email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
    ],
    Password: ['', Validators.required],
  });

  // toggle(event: Event): void {
  //   let elementId: string = (event.target as Element).id;
  // }
  // onClick(event:any) {
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var idAttr = target.attributes.id;
  //   var value = idAttr.nodeValue;
  //   console.log("dssdsadsadeaskfncaerlivgjn",event);
  // }

  ngOnInit(): void {
    this.sin.signin$.subscribe(data => {
      this.state = data;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
      
  }
  here(){
    console.log("hhhhhhhhhheeeeeeeereeee");
  }
  get EmailName() {
    return this.siginform.get('Email');
  }
  get PasswordName() {
    return this.siginform.get('Password');
  }
  data = {
    EmailName: this.PasswordName?.value,
    PasswordName: this.PasswordName?.value,
  };

  login() {
    return this.users.login({
      EmailName: this.EmailName?.value,
      PasswordName: this.PasswordName?.value,
    }).subscribe(
        (data) => {
          console.log('result of login', data);
          if (data.result == 'wrong username or password') {
            alert('wrong username or password');
          } else {
            sessionStorage.setItem('currentUser',JSON.stringify(data.userData))
            console.log("lastname: ",data.userData[0].lastname);
            this.sin.setSignin(false);
             this.sin.setWelcome(data.userData[0].lastname);
          }
        },
        (err) => {
          console.log('login error ', err);
        }
      );
  }
  openSignup(){
    this.sin.setSignin(false);
    this.sin.setSignup(true);
  }
  close(){
    this.sin.setSignin(false);
  }
  

}

