import { Order } from './order';

export interface Invoice {
  id: number; // Match backend
  createdAt: Date;
  expiryAt: Date; // Match backend field name
  orders: Order[]; // Plural!
}
