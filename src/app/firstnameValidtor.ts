import { AbstractControl, ControlConfig } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
//
export function ForbiddenNameValidator(adminstrator: RegExp)
{
  return (control:AbstractControl) => {
    const forbidden = /admin|adminastartor/.test(control.value);
    return forbidden ? { 'forbiddenName': { value: control.value }} :null;
  };
}
