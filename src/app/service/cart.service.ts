import { Injectable } from '@angular/core';
import { CartLine } from '../model/cart-line';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCart();
  }
  private readonly CART_KEY = 'cart';
  lines: CartLine[] = [];
  //   lines: CartLine[] = [
  //   { product: { id: 1, name: "Thinking Cap", ... }, quantity: 2 },
  //   { product: { id: 2, name: "Chess Clock", ... }, quantity: 1 }
  // ];

  itemCount: number = 0;
  cartPrice: number = 0;
  // Load cart from local storage
  private loadCart(): void {
    const cartData = localStorage.getItem(this.CART_KEY);
    if (cartData) {
      this.lines = JSON.parse(cartData);
      this.recalculate();
    }
  }

  // Save cart to local storage
  private saveCart(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.lines));
  }

  // Add a product to the cart
  addLine(product: Product, quantity: number): void {
    const line = this.lines.find((l) => l.product.id === product.id);
    if (line) {
      line.quantity += quantity;
    } else {
      this.lines.push({ product, quantity });
    }
    this.recalculate();
  }

  // Update quantity of a product
  updateQuantity(product: Product, quantity: number): void {
    const line = this.lines.find((l) => l.product.id === product.id);
    if (line) {
      line.quantity = quantity;
      this.recalculate();
    }
  }

  // Remove a line by product ID
  removeLine(productId: number): void {
    this.lines = this.lines.filter((l) => l.product.id !== productId);
    this.recalculate();
  }

  // Clear all cart lines
  clear(): void {
    this.lines = [];
    this.recalculate();
  }

  // Update itemCount and cartPrice based on current lines
  private recalculate(): void {
    this.itemCount = this.lines.reduce(
      (total, line) => total + line.quantity,
      0
    );
    this.cartPrice = this.lines.reduce(
      (total, line) => total + line.quantity * line.product.price,
      0
    );
    this.saveCart();
  }
}
