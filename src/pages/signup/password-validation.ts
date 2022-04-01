import { AbstractControl } from "@angular/forms";

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get("password").value; // to get value in input tag
    let confirmPassword = AC.get("confirmPassword").value; // to get value in input tag

    // console.log('password' + password);
    // console.log('confirmPassword' + confirmPassword);
    if (password != confirmPassword) {
      // console.log('false PASSWORD WRONG ');
      AC.get("confirmPassword").setErrors({ MatchPassword: true });
    } else {
      // console.log('true PASSWORD MATCH');
      return null;
    }
  }
}
