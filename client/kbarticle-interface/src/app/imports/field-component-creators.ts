import { Article_Field } from '../Articles-module/classes/article_fields';

/**
 * Class contains functions to create angular specific form elements to be appened dynamically to a reactive form.
 * Used to create field component body from the field information stored in the database
 * Used in :
 * Create article component
 * Edit article component
 */
export class FieldComponentCreators{

    /**
     * 
     * @param fieldList : list of objects of type article_fields ,
     * returns a html template by creating components specific to indivisual fields to be used in creating dynamic form
     */
    public static createFieldComponent(fieldList : Article_Field[]): string{
        console.log(fieldList);
        let formBodyTemplate = ``;
        fieldList.forEach(field => {
            switch(field.field_type){
                case 'text':
                formBodyTemplate = formBodyTemplate + this.createTextComponent(field);
                break;
                case 'textarea':
                formBodyTemplate = formBodyTemplate + this.createTextareaComponent(field);
                break;
                case 'dropdown':
                formBodyTemplate = formBodyTemplate + this.createDropdownComponent(field);
                break;
                case 'multiselect':
                formBodyTemplate = formBodyTemplate + this.createMultiselectComponent(field);
                break;
                case 'checkbox':
                formBodyTemplate = formBodyTemplate + this.createCheckboxComponent(field);
                break;
                case 'radiobox':
                formBodyTemplate = formBodyTemplate + this.createRadioboxComponent(field);
                break;
                default:
                this.unknownFieldType(field);
                break;
            }
        });
        return formBodyTemplate;
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type text
     */
    public static createTextComponent(field: Article_Field): string{
        return `<div class="col-md-12 form-group">
                    <mat-form-field class="col-md-12">
                    <input matInput formControlName= ${field.field_name} placeholder="Article Title">
                    </mat-form-field>
                </div>`;
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of textarea
     */
    public static createTextareaComponent(field: Article_Field): string{
        return `<div class="article-body-attr col-md-12">
                    <label>${field.field_name} :</label>
                    <editor id= ${field.field_name}
                    formControlName = ${field.field_name}
                    initialValue="<p>Initial content - ${field.field_name}</p>"
                    [init]="tiny_mce_editor_config">
                    </editor>
                </div>`;
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type dropdown select
     */
    public static createDropdownComponent(field: Article_Field): string{

        const field_values = JSON.parse(field.field_value);
        let field_value_template =  FieldComponentCreators.getSelectFieldValueTemplate(field_values);
                            
            console.log(field_value_template);
        return `<div class="col-md-6">
                    <mat-form-field class="col-md-10">
                    <mat-label>${field.field_name}</mat-label>
                    <mat-select formControlName = ${field.field_name}>
                    <mat-option>None</mat-option>
                    ${field_value_template}
                    </mat-select>
                    </mat-form-field>
                </div>`;
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type multiselect dropdown
     */
    public static createMultiselectComponent(field: Article_Field): string{
        const field_values = JSON.parse(field.field_value);
        let field_value_template =  FieldComponentCreators.getSelectFieldValueTemplate(field_values);
                            
        
        return `<div class="col-md-6">
                    <mat-form-field class="col-md-10">
                    <mat-label>${field.field_name}</mat-label>
                    <mat-select formControlName = ${field.field_name} multiple>
                    <mat-option>None</mat-option>
                    ${field_value_template}
                    </mat-select>
                    </mat-form-field>
                </div>`;
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type text
     */
    public static createCheckboxComponent(field: Article_Field): string{
        return `<mat-checkbox class="col-md-12" formControlName = ${field.field_name} > ${field.field_name}</mat-checkbox>`;
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type radiobox
     */
    public static createRadioboxComponent(field: Article_Field): string{
        const field_values = JSON.parse(field.field_value);
        let field_value_template =  FieldComponentCreators.getRadioFieldValueTemplate(field_values);
        return `<mat-radio-group aria-label="Select an option">
                    ${field_value_template}
                </mat-radio-group>`;
    }

    /**
     * default function to handle unknown field types
     * @param field article_field object 
     */
    public static unknownFieldType(field: Article_Field): void {
        console.error('UNKNOWN field type error');
        console.log(field);
    }

    /**
     * creates a select option values template from list of values
     * @param field_values : list of field values
     */
    private static getSelectFieldValueTemplate(field_values: string[]) {
        return field_values.map((value) => {
            value = value.replace(/"/g, "");
            return `<mat-option [value]= ${value.replace(/ /g, "_")}>${value}</mat-option>`;
        }).join().replace(/,/g, "");
    }

    /**
     * creates a radiobox option values template from list of values
     * @param field_values : list of field values
     */
    private static getRadioFieldValueTemplate(field_values: string[]) {
        return field_values.map((value) => {
            value = value.replace(/"/g, "");
            return `<mat-radio-button [value]= ${value.replace(/ /g, "_")}>${value}</mat-radio-button>`;
        }).join().replace(/,/g, "");
    }

}