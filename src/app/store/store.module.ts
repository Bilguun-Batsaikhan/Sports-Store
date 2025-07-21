import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from '../admin/orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [
    StoreComponent,
    CheckoutComponent,
    ProductCardComponent,
    OrdersComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [
    StoreComponent,
    CheckoutComponent,
    ProductCardComponent,
    OrdersComponent,
  ],
})
export class StoreModule {}
