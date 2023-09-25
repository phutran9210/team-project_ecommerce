export interface ProductInterface {
  cart_detail_id: string;
  cart_id: string;
  engravingText?: string;
  product_id: string;
  product_name: string;
  product_description: string;
  price: string;
  coverImages: string[];
  primary_img: string;
  images: string[];
  categories: string[];
  product_type: string;
  quantity: number;
  onSale: string;
  voucher: boolean;
  engraving: boolean;
  engraving_checked: number | boolean;
  details: any;
  sale_start: null | Date;
  sale_end: null | Date;
  engraving_content: string;
  category_name: string;
}

export interface CartItemInterface {
  product_id: string;
}
