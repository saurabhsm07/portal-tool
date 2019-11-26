import { Article_Field} from './article_fields';
export class Article_Form {
    id?: number;
    name: string;
    active?: boolean;
    default_form?: boolean;
    article_field_ids?: Array<Article_Field>;
    created_at?: Date;
    updated_at?: Date;
}