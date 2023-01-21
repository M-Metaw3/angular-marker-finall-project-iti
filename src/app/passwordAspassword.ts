import { AbstractControl } from '@angular/forms';

export function passwordAspassword(control: AbstractControl) {
  const password = control.get('Password');
  const RepeatPassword = control.get('RepeatPassword');
  return password && RepeatPassword && password.value !== RepeatPassword.value
    ? { misMatch: true }
    : null;
}
