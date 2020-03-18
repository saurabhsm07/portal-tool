export class Field_value {
    id: number;
    type: string;
    name: string;
    values: value[];

}

interface value {
    key: number;
    value: string;
}