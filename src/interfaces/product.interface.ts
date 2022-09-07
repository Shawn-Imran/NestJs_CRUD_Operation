/* eslint-disable prettier/prettier */
export interface Product {
    id?: string;
    title?: string;
    body_html?: string;
    vendor?: string;
    product_type?: string;
    tags?: Array<string>;
    description?: string;
    price?: number;
    readonly?: boolean;
}
