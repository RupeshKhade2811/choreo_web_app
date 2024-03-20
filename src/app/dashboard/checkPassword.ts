import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const identityRevealedValidator: ValidatorFn = (
control: AbstractControl,
  ): ValidationErrors | null => {
    console.log(control)
    const pass=   control.get('newPassword');
    const confPass=  control.get('confirmPassword');
       if(pass?.pristine || confPass?.pristine){
           return null;
       }
   
       return pass && confPass && pass.value !== confPass.value ?{'mismatched':true}:null;
  };