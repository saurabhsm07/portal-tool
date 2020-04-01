import { AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * class with functions of custom validators to be used to validate reactive forms accross modules,
 * for different field types and use cases
 */
export class CustomValidators {

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


      /**
     * Checks if the dropdown select option is updated from none to specific value or not
     * @param control form control for which this validator function is being tested
     */
    public static valueMatch(group: FormGroup, matchString: string) : { [key : string] : any } | null {

        

        if(group.get('confirm_password').value == '' || group.get('confirm_password').value == null){
            group.get('confirm_password').setErrors({'pwdRequired' : 'Password field is required'});
            return {'validation' : false};

        }
        else if(group.get('password').value != group.get('confirm_password').value){
            group.get('confirm_password').setErrors({'pwdMatch' : 'Password and Confirm Password do not match'})
            return {'validation' : false};
        }else{
            return null;
        }
    }

    public static validateEmailListFormat(control: AbstractControl) : { [key: string] : any} | null {
        const emails = control.value
        const email_regex = new RegExp(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`)
        let if_error = false;
        emails.forEach(email => {
           if(!email_regex.test(email)){
            if_error = true;
           } 
           
           
        });
        if((if_error) && (emails.length > 0)){
            control.markAsDirty()
            control.markAsTouched()
            return {invalidEmails: true}
        }else{
            return null;
        }
        
    }
}