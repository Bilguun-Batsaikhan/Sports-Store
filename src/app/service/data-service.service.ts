import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { Order } from '../model/order';
import { HttpClient } from '@angular/common/http';
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
  baseUrlProducts = 'http://localhost:8080/products';
  baseUrlOrders = 'http://localhost:8080/orders';
  baseUrlUsers = 'http://localhost:8080/api/users';
  baseUrlInvoices = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrlProducts}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrlProducts}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrlProducts}/categories`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrlOrders}`, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrlOrders}`);
  }

  getOrdersPaidInfo(): Observable<OrderPaymentInfo[]> {
    return this.http.get<OrderPaymentInfo[]>(`${this.baseUrlOrders}/partial`);
  }

  shipOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrlOrders}/${orderId}/ship`, {});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrlUsers);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrlInvoices);
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrlInvoices, invoice);
  }
}
