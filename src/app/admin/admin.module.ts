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

@NgModule({
  declarations: [
    OrdersComponent,
    InvoicesListComponentComponent,
    InvoiceFormComponentComponent,
    AnnualReportComponentComponent,
    UserListComponent,
    UserCardComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FormsModule],
  exports: [
    OrdersComponent,
    InvoicesListComponentComponent,
    InvoiceFormComponentComponent,
    AnnualReportComponentComponent,
  ],
})
export class AdminModule {}
