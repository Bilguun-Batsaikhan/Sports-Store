import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { CartService } from '../../service/cart.service';
import { ProductRepositoryService } from '../../service/product-repository.service';
import { AuthService } from 'src/app/service/auth.service';
// ● order: Order
// ● orderSent: boolean
// ● submitted: boolean
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private productRepository: ProductRepositoryService
  ) {}
  order: Order = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    shipped: false,
    lines: [],
    userId: 0,
  };
  orderSent: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {}
  //● submitOrder(form: NgForm)
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.order.lines = this.cartService.lines;

    if (
      this.order.name &&
      this.order.address &&
      this.order.city &&
      this.order.state &&
      this.order.zip &&
      this.order.country &&
      this.order.lines.length > 0
    ) {
      const user = localStorage.getItem('user');
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const userObj = JSON.parse(stored);
          this.order.userId = userObj.id;
        } catch (e) {
          console.error('Invalid user JSON', e);
        }
      }

      console.log('Order submitted:', this.order);

      // Simulate processing time and potential failure
      setTimeout(() => {
        // Now properly handle the Observable
        this.productRepository.saveOrder(this.order).subscribe({
          next: (savedOrder) => {
            this.orderSent = true;
            this.submitted = false;
            this.cartService.clear(); // Clear the cart after successful order
            console.log('Order successfully processed:', savedOrder);
          },
          error: (err) => {
            this.submitted = false;
            this.orderSent = false;
            this.errorMessage = 'Order processing failed. Please try again.';
            console.error('Order failed to process:', err);
          },
        });
      }, 2000); // 2 second delay to simulate processing
    } else {
      this.submitted = false;
      this.errorMessage =
        'Please fill in all required fields and ensure your cart is not empty.';
    }
  }

  resetForm(): void {
    this.order = {
      id: 0,
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      shipped: false,
      lines: [],
      userId: 0,
    };
    this.orderSent = false;
    this.submitted = false;
    this.errorMessage = '';
  }
}
