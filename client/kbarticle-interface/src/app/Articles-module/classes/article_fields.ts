export class Article_Fields {
    id?: number;
    field_name: string;
    field_value?: {};
    created_at? : Date;
    updated_at? : Date;
    description? : Text;
    removable? : boolean;
    field_type : string;
    active : boolean;
    required : boolean;
}