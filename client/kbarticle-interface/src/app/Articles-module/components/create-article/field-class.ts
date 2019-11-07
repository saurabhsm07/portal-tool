export class Field {
    name : string;
    type : field_type;
    values : Array<string | number>;
}

type field_type = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'multiselect'
