import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InvoicesListComponentComponent } from './invoices-list-component/invoices-list-component.component';
import { InvoiceFormComponentComponent } from './invoice-form-component/invoice-form-component.component';
import { AnnualReportComponentComponent } from './annual-report-component/annual-report-component.component';
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

@NgModule({
  declarations: [
    OrdersComponent,
    InvoicesListComponentComponent,
    InvoiceFormComponentComponent,
    AnnualReportComponentComponent,
    UserListComponent,
    UserCardComponent,
    ProductFormComponent,
    UserFormComponent,
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
  ],
  exports: [
    OrdersComponent,
    InvoicesListComponentComponent,
    InvoiceFormComponentComponent,
    AnnualReportComponentComponent,
    ProductFormComponent,
  ],
})
export class AdminModule {}
