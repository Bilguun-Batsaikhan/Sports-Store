import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartLine } from '../../model/cart-line';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent {
  constructor(private cartService: CartService, private router: Router) {}

  get lines(): CartLine[] {
    return this.cartService.lines;
  }

  get itemCount(): number {
    return this.cartService.itemCount;
  }

  get cartPrice(): number {
    return this.cartService.cartPrice;
  }

  updateQuantity(product: Product, quantity: number): void {
    this.cartService.updateQuantity(product, quantity);
  }

  removeLine(productId: number): void {
    this.cartService.removeLine(productId);
  }

  clearCart(): void {
    this.cartService.clear();
  }

  proceedToCheckout(): void {
    // Close the modal first
    const modalElement = document.getElementById('cartModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }

    // Navigate to checkout after a short delay to allow modal to close
    setTimeout(() => {
      this.router.navigate(['/checkout']);
    }, 300);
  }
}
