import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualReportComponentComponent } from './annual-report-component/annual-report-component.component';
import { InvoiceFormComponentComponent } from './invoice-form-component/invoice-form-component.component';
import { InvoicesListComponentComponent } from './invoices-list-component/invoices-list-component.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AnnualReportComponentComponent,
    InvoiceFormComponentComponent,
    InvoicesListComponentComponent,
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [
    AnnualReportComponentComponent,
    InvoiceFormComponentComponent,
    InvoicesListComponentComponent,
    InvoicesComponent,
  ],
  providers: [],
})
export class InvoiceModule {}
