export class Field_value {
    id: number;
    type: string;
    name: string;
    key: string;
    required: number;
    values: value[];

}

interface value {
    key: number;
    value: string;
}