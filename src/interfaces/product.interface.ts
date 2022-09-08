/* eslint-disable prettier/prettier */
export interface Product {
  id?: string;
  title?: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  tags?: Array<string>;
  variants?: Variant[];
  options?: Option[];
  description?: string;
}

export interface Variant {
  id?: string;
  option1?: string;
  option2?: string;
}

export interface Option {
  name?: string;
  values?: Array<string>;
}
