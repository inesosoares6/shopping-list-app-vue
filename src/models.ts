export interface ProductObject {
  [key:string]: Product;
}

export interface Payload {
  id: string;
  product: Product;
}

export interface PayloadUpdate {
  id: string;
  updates: Partial<Product>;
}

export interface Product {
  name: string;
  completed: boolean;
  keywords: string;
  selected: boolean;
  notes: string;
  owner: string;
  favorite: boolean;
  inList: boolean;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Settings {
  username: string;
  list: string;
}

export interface PayloadSettings {
  id: string;
  setting: Settings;
}

export interface PayloadSettingsUpdate {
  id: string;
  updates: Settings;
}
