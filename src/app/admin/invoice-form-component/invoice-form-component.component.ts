import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';
import { Order } from 'src/app/model/order';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-invoice-form-component',
  templateUrl: './invoice-form-component.component.html',
  styleUrls: ['./invoice-form-component.component.css'],
})
export class InvoiceFormComponentComponent implements OnInit {
  availableOrders: Order[] = [];
  invoice: Invoice = {
    id: 0,
    createdAt: new Date(),
    expiryAt: new Date(),
    orders: [],
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAvailableOrders();
  }

  private loadAvailableOrders(): void {
    this.dataService.getOrders().subscribe((orders) => {
      this.availableOrders = orders;
    });
  }

  onSubmit(): void {
    // Logic to handle form submission
    console.log('Invoice submitted:', this.invoice);
    // Here you would typically send the invoice to a service for processing
  }

  resetForm(): void {
    this.invoice = {
      id: 0,
      createdAt: new Date(),
      expiryAt: new Date(),
      orders: [],
    };
  }
}
