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

/**
 * Method returns a string of the request form static header 
 */
public static getRequestFormHeader(): string {
    return `<form id="new_request" 
    [formGroup]='ticket_request_form' (ngSubmit) = "submitTicket()" class="request-form">
    <div formGroupName='header' class="request_cc_emails">
  <label for="request_collaborators_">CC</label>
  <ul>
    <li>
      <mat-form-field class="example-chip-list">
        <mat-chip-list #chipList aria-label="CC'd emails">
          <mat-chip *ngFor="let email of emails" [selectable]="selectable" [removable]="removable" (removed)="remove(email)">
            {{email}}
            <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
          </mat-chip>
          <input 
                placeholder="Add Emails" 
                [matChipInputFor]="chipList" 
                [matChipInputSeparatorKeyCodes]="separatorKeysCodes" 
                [matChipInputAddOnBlur]="addOnBlur"
                (matChipInputTokenEnd)="add($event)">
        </mat-chip-list>
      </mat-form-field>
    </li>
  </ul>
  <div class="notification notification-error notification-inline" aria-hidden="true">
  </div>
  </div>
  <div formGroupName='body' class="form-fields" [innerHTML]="request_form_template | sanitizeRequestForm">
  `;
}

/**
 * Method returns a string of the request form static footer 
 */
public static getRequestFormFooter(): string {
    return `</div>
    <!-- <script data-conditional-fields="[]"></script> -->
 
 <div formGroupName="footer" class="form-field" style="display: none;">
 <label for="request-attachments">
  Attachments
 </label>
 <div id="upload-dropzone" class="upload-dropzone">
 <input formControlName = 'file_attachments' type="file" multiple="true" id="request-attachments" data-fileupload="true" data-dropzone="upload-dropzone" data-error="upload-error" data-create-url="/hc/en-us/request_uploads" data-name="request[attachments][]" data-pool="request-attachments-pool" data-delete-confirm-msg="" aria-describedby="upload-error">
 <span>
  <a>Add file</a> or drop files here
 </span>
 </div>
 
 <div id="upload-error" class="notification notification-error notification-inline" style="display: none;">
 <span data-upload-error-message=""></span>
 </div>
 
 
 <ul id="request-attachments-pool" class="upload-pool" data-template="upload-template"></ul>
 
 <script type="text/html" id="upload-template">
 <li class="upload-item" data-upload-item>
 <a class="upload-link" target="_blank" data-upload-link></a>
 <p class="upload-path" data-upload-path></p>
 <p class="upload-path" data-upload-size></p>
 <p data-upload-issue class="notification notification-alert notification-inline" aria-hidden="true"></p>
 <span class="upload-remove" data-upload-remove></span>
 <div class="upload-progress" data-upload-progress></div>
 <input  type="hidden">
 </li>
 </script>
 </div>
 
 <footer>
 <input type="submit" name="commit" value="Submit">
 </footer>
 </form>`
   }
}