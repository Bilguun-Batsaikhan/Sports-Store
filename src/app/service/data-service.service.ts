import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { Order } from '../model/order';
import { HttpClient } from '@angular/common/http';
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
}
