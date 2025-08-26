import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';
import { Order } from '../model/order';
import { User } from '../model/user';
import { Invoice } from '../model/invoice';
import { OrderPaymentInfo } from '../model/order-payment-info';
// ● getProducts(): Observable<Product[]>
// ● getProduct(id: number): Observable<Product>
// ● getCategories(): Observable<string[]>
// ● saveOrder(order: Order): Observable<Order>
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly LS_PRODUCTS = 'mock_products';
  private readonly LS_ORDERS = 'mock_orders';
  private readonly LS_USERS = 'mock_users';
  private readonly LS_INVOICES = 'mock_invoices';

  private products: Product[] = [];
  private orders: Order[] = [];
  private users: User[] = [];
  private invoices: Invoice[] = [];

  constructor() {
    this.loadAll();
  }

  // ---------- Load/Save helpers ----------
  private loadAll(): void {
    // Products
    const p = localStorage.getItem(this.LS_PRODUCTS);
    if (p) {
      this.products = JSON.parse(p);
    } else {
      this.products = this.seedProducts();
      this.saveProducts();
    }

    // Orders
    const o = localStorage.getItem(this.LS_ORDERS);
    if (o) {
      const parsed: Order[] = JSON.parse(o);
      // Ensure dates are restored and defaults present
      this.orders = parsed.map((ord) => ({
        ...ord,
        orderDate: ord.orderDate ? new Date(ord.orderDate) : new Date(),
        shipped: ord.shipped ?? false,
      }));
    } else {
      this.orders = this.seedOrders();
      this.saveOrders();
    }

    // Users
    const u = localStorage.getItem(this.LS_USERS);
    if (u) {
      this.users = JSON.parse(u);
    } else {
      this.users = this.seedUsers();
      this.saveUsers();
    }

    // Invoices
    const i = localStorage.getItem(this.LS_INVOICES);
    if (i) {
      const parsed: Invoice[] = JSON.parse(i);
      this.invoices = parsed.map((inv) => ({
        ...inv,
        createdAt: new Date(inv.createdAt),
        expiryAt: new Date(inv.expiryAt),
        orders: (inv.orders || []).map((o) => ({
          ...o,
          orderDate: o.orderDate ? new Date(o.orderDate) : undefined,
        })),
      }));
    } else {
      this.invoices = this.seedInvoices();
      this.saveInvoices();
    }
  }

  private saveProducts(): void {
    localStorage.setItem(this.LS_PRODUCTS, JSON.stringify(this.products));
  }
  private saveOrders(): void {
    localStorage.setItem(this.LS_ORDERS, JSON.stringify(this.orders));
  }
  private saveUsers(): void {
    localStorage.setItem(this.LS_USERS, JSON.stringify(this.users));
  }
  private saveInvoices(): void {
    localStorage.setItem(this.LS_INVOICES, JSON.stringify(this.invoices));
  }

  // ---------- Seeds ----------
  private seedProducts(): Product[] {
    return [
      { id: 1, name: 'Thinking Cap', category: 'Chess', description: 'Improve your game instantly', price: 16.0 },
      { id: 2, name: 'Chess Clock', category: 'Chess', description: 'Precision timing for chess matches', price: 35.5 },
      { id: 3, name: 'Soccer Ball', category: 'Soccer', description: 'Official size and weight', price: 24.99 },
      { id: 4, name: 'Basketball', category: 'Basketball', description: 'Indoor/outdoor composite leather', price: 29.99 },
      { id: 5, name: 'Tennis Racket', category: 'Tennis', description: 'Lightweight and powerful', price: 89.0 },
      { id: 6, name: 'Running Shoes', category: 'Running', description: 'Comfort and speed combined', price: 79.99 },
      { id: 7, name: 'Yoga Mat', category: 'Fitness', description: 'Non-slip, eco-friendly material', price: 19.99 },
      { id: 8, name: 'Baseball Glove', category: 'Baseball', description: 'Durable leather for great catches', price: 49.99 },
      { id: 9, name: 'Boxing Gloves', category: 'Boxing', description: 'Premium padding for protection', price: 59.99 },
      { id: 10, name: 'Skateboard', category: 'Skating', description: 'Maple deck with smooth bearings', price: 54.99 },
    ];
  }

  private seedUsers(): User[] {
    return [
      { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', username: 'admin', password: 'admin', role: 'admin' },
      { id: 2, firstName: 'Alice', lastName: 'Doe', email: 'alice@example.com', username: 'alice', password: 'password', role: 'user' },
      { id: 3, firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', username: 'bob', password: 'password', role: 'user' },
    ];
  }

  private seedOrders(): Order[] {
    // Start with no orders; users will create them from checkout
    return [];
  }

  private seedInvoices(): Invoice[] {
    return [];
  }

  // ---------- Products ----------
  getProducts(): Observable<Product[]> {
    return of([...this.products]);
  }

  getProduct(id: number): Observable<Product> {
    const found = this.products.find((p) => p.id === id);
    return found ? of({ ...found }) : throwError(() => ({ error: { message: 'Product not found' } }));
  }

  getCategories(): Observable<string[]> {
    const categories = Array.from(new Set(this.products.map((p) => p.category)));
    return of(categories);
  }

  // ---------- Orders ----------
  saveOrder(order: Order): Observable<Order> {
    const nextId = (this.orders.reduce((m, o) => Math.max(m, o.id || 0), 0) || 0) + 1;
    const ord: Order = {
      ...order,
      id: nextId,
      shipped: order.shipped ?? false,
      orderDate: new Date(),
    };
    this.orders.push(ord);
    this.saveOrders();
    return of({ ...ord });
  }

  getOrders(): Observable<Order[]> {
    // Return copy to avoid external mutation
    return of(this.orders.map((o) => ({ ...o })));
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return of(this.orders.filter((o) => o.userId === userId).map((o) => ({ ...o })));
  }

  getOrdersPaidInfo(): Observable<OrderPaymentInfo[]> {
    const infos: OrderPaymentInfo[] = this.orders.map((o) => ({
      id: o.id!,
      name: o.name,
      paid: this.isOrderPaid(o),
    }));
    return of(infos);
  }

  private isOrderPaid(order: Order): boolean {
    if (!order.invoiceId) return false;
    const inv = this.invoices.find((i) => i.id?.toString() === order.invoiceId?.toString());
    return !!inv?.paid;
  }

  shipOrder(orderId: number): Observable<Order> {
    const idx = this.orders.findIndex((o) => o.id === orderId);
    if (idx === -1) {
      return throwError(() => ({ error: { message: 'Order not found' } }));
    }
    this.orders[idx] = { ...this.orders[idx], shipped: true };
    this.saveOrders();
    return of({ ...this.orders[idx] });
  }

  // ---------- Users ----------
  getUsers(): Observable<User[]> {
    return of(this.users.map((u) => ({ ...u })));
  }

  // ---------- Invoices ----------
  getInvoices(): Observable<Invoice[]> {
    return of(this.invoices.map((i) => ({ ...i, orders: i.orders.map((o) => ({ ...o })) })));
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    const nextId = (this.invoices.reduce((m, i) => Math.max(m, i.id || 0), 0) || 0) + 1;
    const inv: Invoice = {
      ...invoice,
      id: nextId,
      createdAt: invoice.createdAt ? new Date(invoice.createdAt) : new Date(),
      expiryAt: invoice.expiryAt ? new Date(invoice.expiryAt) : new Date(),
      paid: invoice.paid ?? false,
      orders: (invoice.orders || []).map((o) => ({ ...o })),
    };

    // Update referenced orders with invoiceId
    inv.orders.forEach((o) => {
      const idx = this.orders.findIndex((ord) => ord.id === o.id);
      if (idx !== -1) {
        this.orders[idx] = { ...this.orders[idx], invoiceId: inv.id };
      }
    });
    this.saveOrders();

    this.invoices.push(inv);
    this.saveInvoices();
    return of({ ...inv, orders: inv.orders.map((o) => ({ ...o })) });
  }
}
