export class Article {
    id?: number;
    title: string;
    section: {id: number, name: string};
    article_form_id?: number;
    url?: Text;
    author:{id: number, name: string};
    body:{};
    label_names: string;
    user_segment_id?: number;
    created_at?: Date;
    updated_at: Date;
    review_state: {state: string, value: number};
    draft: {status: boolean, type: string};
}

