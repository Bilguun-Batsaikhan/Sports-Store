import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {
  constructor(private cartService: CartService) {}

  get itemCount(): number {
    return this.cartService.itemCount;
  }

  get cartPrice(): number {
    return this.cartService.cartPrice;
  }
}
