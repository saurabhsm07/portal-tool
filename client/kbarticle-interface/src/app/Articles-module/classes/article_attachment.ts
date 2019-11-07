export class Article_Attachment {
    url?: string;
    article_id: number;
    content_url?: string;
    content_type?: string;
    size?: number;
    inline?: boolean;
    created_at?: Date;
    updated_at?: Date;
    file_name?: string;
    file_data: Blob;
}