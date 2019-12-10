export class Section {
    id?: number;
    category_id:number;
    parent_section_id:number;
    name: string;
    description?: Text;
    url?: Text;
    locale?: string;
    html_url?: string;
    createdAt?: Date;
    updatedAt?: Date;
    outdated?:boolean;
    position?: number;
}