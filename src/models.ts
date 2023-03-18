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
  selected: boolean;
  notes: string;
  owner: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Settings {
  username: string;
}

export interface PayloadSettings {
  id: string;
  setting: Settings;
}

export interface PayloadSettingsUpdate {
  id: string;
  updates: Settings;
}
