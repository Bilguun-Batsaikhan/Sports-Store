import { Order } from './order';

export interface Invoice {
  id?: number; // Optional - backend auto-generates this
  createdAt: Date;
  expiryAt: Date; // Match backend field name
  orders: Order[]; // Plural!
  paid?: boolean; // Optional, default false
}
