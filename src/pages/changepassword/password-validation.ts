import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    // console.log(AC.get('password'));
    if (AC.get('password').value != null && AC.get('confirmPassword').value != null){
      let password = AC.get('password').value; // to get value in input tag
      let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if(password != confirmPassword) {
        console.log('false');
        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
        console.log('true');
        return null
      }
    }
    
  }
}
