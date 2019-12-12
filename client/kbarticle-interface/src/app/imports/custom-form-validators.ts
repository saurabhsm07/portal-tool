import { AbstractControl } from '@angular/forms';

/**
 * class with functions of custom validators to be used to validate reactive forms accross modules,
 * for different field types and use cases
 */
export class customValidators {

    /**
     * Checks if the dropdown select option is updated from none to specific value or not
     * @param control form control for which this validator function is being tested
     */
    public static forbiddenNullValueSelect(control: AbstractControl) : { [key : string] : any } | null {
        console.log(control.value)
        if(control.value == 0){
            return {'nullValue' : 'dropDown cannot have a value of None'};
        }else{
            return null;
        }
    }
}