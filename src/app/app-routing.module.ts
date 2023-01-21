import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BigsearchComponent } from './bigsearch/bigsearch.component';
import { CameraComponent } from './camera/camera.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { GlassesComponent } from './glasses/glasses.component';
import { HomeComponent } from './home/home.component';
import { LaptopComponent } from './laptop/laptop.component';
import { MobileComponent } from './mobile/mobile.component';
import { ShopComponent } from './shop/shop.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TshirtComponent } from './tshirt/tshirt.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'home/:id', component: DetailsComponent },
  { path: 'home/t-shirts/:id', component: DetailsComponent },
  { path: 'home/camera/:id', component: DetailsComponent },
  { path: 'home/mobile/:id', component: DetailsComponent },
  { path: 'home/laptop/:id', component: DetailsComponent },
  { path: 'home/glass/:id', component: DetailsComponent },
  { path: 'bigsearch', component: BigsearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact', component: ContactComponent },
  {path:  't-shirts',component:TshirtComponent},
  {path:  'camera',component:CameraComponent},
  {path:  'laptop',component:LaptopComponent},
  {path:  'mobile',component:MobileComponent},
  {path:  'glass',component:GlassesComponent},
  { path: 'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
