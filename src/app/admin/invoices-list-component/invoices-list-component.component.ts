import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';
import { DataService } from 'src/app/service/data-service.service';
import { InvoiceFilterService } from 'src/app/service/invoice-filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices-list-component',
  templateUrl: './invoices-list-component.component.html',
  styleUrls: ['./invoices-list-component.component.css'],
})
export class InvoicesListComponentComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(
    private dataService: DataService,
    private invoiceFilterService: InvoiceFilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.dataService.getInvoices().subscribe((invoices: Invoice[]) => {
      this.invoices = invoices;
    });
  }

  viewOrders(invoiceId: number): void {
    // Set the filter in the service (convert to string for consistency)
    this.invoiceFilterService.setSelectedInvoiceId(invoiceId.toString());
    
    // Navigate to orders page
    this.router.navigate(['/admin/orders']);
  }
}
