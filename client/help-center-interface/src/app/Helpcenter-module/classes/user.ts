export class User {
    id?:number;
    name?: string;
    email:string;
    phone?:number;
    email_verified_status?: boolean;
    email_verified_at?: Date;
    password?: string;
    alias?: Text;
    signature?: Text;
    details?: Text;
    is_admin?: Boolean;
    remember_token?: string;
    role_id?: Boolean;
    ticket_access?:Boolean;
    language_id?: number;
    timezone_id?: number;
    suspend_status?: boolean;
    delete_status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    status?: boolean;
    user_type?: Text;
    last_login_at?: Date;
}