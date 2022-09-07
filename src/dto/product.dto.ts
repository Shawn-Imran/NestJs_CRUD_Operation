/* eslint-disable prettier/prettier */

export class CreateProductDto{
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    tags: Array<string>;
    description: string;
    price: number;
    readonly: boolean;
}