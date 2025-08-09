import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoiceModule } from '../invoice/invoice.module';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
@NgModule({
  declarations: [
    OrdersComponent,
    UserListComponent,
    UserCardComponent,
    ProductFormComponent,
    UserFormComponent,
    OrderDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    InvoiceModule,
  ],
  exports: [OrdersComponent, ProductFormComponent],
})
export class AdminModule {}
