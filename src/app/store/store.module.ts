import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { StoreComponent } from './store/store.component';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [StoreComponent, CheckoutComponent, ProductCardComponent],
  imports: [CommonModule, SharedModule, FormsModule, AdminModule],
  exports: [StoreComponent, CheckoutComponent, ProductCardComponent],
})
export class StoreModule {}
