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
     * return angular material html component for input of typearea
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
     * return angular material html component for input of type text
     */
    public static createDropdownComponent(field: Article_Field): string{
        return 'dropdown';
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type text
     */
    public static createMultiselectComponent(field: Article_Field): string{
        return 'multiselect';
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type text
     */
    public static createCheckboxComponent(field: Article_Field): string{
        return 'checkbox';
    }

    /**
     * 
     * @param field : article_field object 
     * return angular material html component for input of type text
     */
    public static createRadioboxComponent(field: Article_Field): string{
        return 'radiobox';
    }

    public static unknownFieldType(field: Article_Field): void {
        console.error('UNKNOWN field type error');
        console.log(field);
    }

}