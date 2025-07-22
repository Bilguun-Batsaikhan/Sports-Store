import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-invoices-list-component',
  templateUrl: './invoices-list-component.component.html',
  styleUrls: ['./invoices-list-component.component.css'],
})
export class InvoicesListComponentComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.dataService.getInvoices().subscribe((invoices: Invoice[]) => {
      this.invoices = invoices;
    });
  }
}
