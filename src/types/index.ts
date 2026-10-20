export type ProductCategory =
  | 'Hoodies'
  | 'Sweatshirts'
  | 'Polo Shirts'
  | 'T-Shirts'
  | 'Caps'
  | 'Bags'
  | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // in KES
  compareAtPrice?: number; // optional original price for discount display
  images: string[];
  sizes: string[]; // e.g. ['S', 'M', 'L', 'XL', 'XXL'] or ['Standard']
  colors: ProductColor[];
  description: string;
  details: string[]; // fabric, weight, care, fit
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique cart item id: `${productId}-${size}-${color}`
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface CheckoutFormState {
  fullName: string;
  phone: string;
  orderNote: string;
}
