export interface ProductObject {
  [key:string]: Product;
}

export interface Payload {
  id: string;
  product: Product;
}

export interface PayloadUpdate {
  id: string;
  updates: Product;
}

export interface Product {
  name: string;
  completed: boolean;
  keywords: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}
