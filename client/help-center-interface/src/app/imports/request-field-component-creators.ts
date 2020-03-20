import { Field_value } from './../Tickets-module/classes/field_value';

/**
 * 
 */
export class RequestFieldCreators {

    public static createFieldComponent(request_fields: Field_value[]){
        let request_form_template = ''
        request_fields.forEach(field => {
            switch(field.type){
                case 'text':
                request_form_template = request_form_template + this.createTextField(field)
                break;

                case 'textarea':
                request_form_template = request_form_template + this.createTextAreaField(field)
                break;

                case 'select':
                request_form_template = request_form_template + this.createSelectField(field)
                break;

                default:
                console.log(`currently we do not support ${field.type}`)
                break;
            }
        });

        return request_form_template;
    }

/**
 * method to create a text field template for request form
 * @param field : field object to create template
 */
public static createTextField(field: Field_value){
return `<div class="form-field string  required  request_subject">
<label for="${field.id}">${field.name}</label>
<input formControlName="${field.name}" type="text" name="${field.name}" id="${field.id}" maxlength="150" size="150">
</div>`
}

/**
 * method to create textarea field template for request form
 * @param field : field object to create template
 */
public static createTextAreaField(field: Field_value){
return `<div class="form-field text  required  request_description">
<label for="${field.id}">${field.name}</label>
<textarea formControlName="${field.name}" name="${field.name}" id="${field.id}" aria-required="true" aria-describedby="request_description_hint" aria-labelledby="request_description_label"></textarea>
<p id="request_description_hint">Please enter the details of your request. A member of our support staff will respond as soon as possible.</p>
</div>`
}

 /**
 * method to create select dropdown field template for request form
 * @param field : field object to create template
 */
public static createSelectField(field: Field_value){
    let fieldValues = ''
    if(field.id == 22367121){
        fieldValues = `<option value= "1">Urgent</option>
                           <option value= "2">High</option>
                           <option value= "3">Normal</option>
                           <option value= "4">Low</option>`
    }
    else{
        fieldValues = field.values.map(option => `<option value="${option.key}">${option.value}</option>`).toString().replace(',', '')
    }
   
return `<div class="form-field select  required  request_priority">
<label for="${field.id}">${field.name}</label>
<select formControlName="${field.name}" class="custom-select">
<option value="-">-</option>`
+ fieldValues +
`</select>
</div>`
}
}