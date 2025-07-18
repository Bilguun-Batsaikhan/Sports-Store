import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../service/data-service.service';
import { Product } from './product';
import { Order } from './order';
// ● getProducts(category?: string): Product[]
// ● getProduct(id: number): Product
// ● getCategories(): string[]
@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataService: DataService) {
    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts(): void {
    this.dataService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  private loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  getProducts(category?: string): Product[] {
    if (category) {
      return this.products.filter((p) => p.category === category);
    }
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }
  saveOrder(order: Order): Observable<Order> {
    return this.dataService.saveOrder(order);
  }
}
