import { Product } from './product.model';
export interface Shipment {
  cart: Product[];
  address: {
    line1: string;
    line2: string;
    city: string;
  };
  user: {
    name: string;
    phone: string;
    id: string;
  };
}
