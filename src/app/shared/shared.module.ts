import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartSummaryComponent } from '../store/cart-summary/cart-summary.component';
import { CartDetailComponent } from '../store/cart-detail/cart-detail.component';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    CartSummaryComponent,
    CartDetailComponent,
    ToastContainerComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    NavbarComponent,
    NotFoundComponent,
    CartSummaryComponent,
    CartDetailComponent,
    ToastContainerComponent,
  ],
})
export class SharedModule {}
