import { Article_Field} from './article_fields';
export class Article_Form {
    id?: number;
    name: string;
    active?: boolean;
    default_form?: boolean;
    article_fields: string;
    created_at?: Date;
    updated_at?: Date;
}