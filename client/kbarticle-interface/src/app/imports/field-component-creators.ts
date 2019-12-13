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
        let fieldStr = '';
        fieldList.forEach(field => {
            switch(field.field_type){
                case 'text':
                fieldStr = fieldStr + 'text';
                break;
                case 'textarea':
                fieldStr = fieldStr + ' textarea ';
                break;
                case 'dropdown':
                fieldStr = fieldStr + ' dropdown ';
                break;
                case 'multiselect':
                fieldStr = fieldStr + ' multiselect ';
                break;
                case 'checkbox':
                fieldStr = fieldStr + ' checkbox ';
                break;
                case 'radiobox':
                fieldStr = fieldStr + ' radiobox  ';
                break;
                default:
                fieldStr = fieldStr + "no idea";
                break;
            }
        });
        return fieldStr;
    }


}