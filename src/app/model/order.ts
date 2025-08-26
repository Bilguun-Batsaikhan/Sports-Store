import { CartLine } from './cart-line';

export interface Order {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shipped?: boolean;
  orderDate?: Date;
  lines: CartLine[];
  invoiceId?: string | number; // Allow both string and number for flexibility
  userId: number;
}
