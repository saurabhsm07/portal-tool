export class Comment {
    id?: number;
    ticket_id?: number;
    comment_type?: string;
    body: string;
    public?: boolean;
    html_body?: string;
    plain_body?: string;
    author_id?: number;
    author_name?: string;
    audit_id?: number;
    via?: string;
    attachments?: string;
    via_data?: string;
    metadata?: string;
    created_at?: Date;
}