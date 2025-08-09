import { Component } from '@angular/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent {
  selectedInvoice: string = 'list-of-invoices'; // Default to show list first

  changeInvoice(invoice: string): void {
    this.selectedInvoice = invoice;
  }
}
