import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';
import { OrderPaymentInfo } from 'src/app/model/order-payment-info';
import { DataService } from 'src/app/service/data-service.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-invoice-form-component',
  templateUrl: './invoice-form-component.component.html',
  styleUrls: ['./invoice-form-component.component.css'],
})
export class InvoiceFormComponentComponent implements OnInit {
  availableOrders: OrderPaymentInfo[] = [];
  selectedOrderIds: number[] = []; // For the Material multi-select

  invoice: Invoice = {
    createdAt: new Date(),
    expiryAt: new Date(),
    orders: [],
    paid: false, // Default to false
  };

  constructor(
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadAvailableOrders();
  }

  private loadAvailableOrders(): void {
    this.dataService.getOrdersPaidInfo().subscribe((orders) => {
      this.availableOrders = orders.filter((order) => !order.paid);
    });
  }

  onSubmit(): void {
    this.dataService.getOrders().subscribe((orders) => {
      this.invoice.orders = orders.filter((order) =>
        this.selectedOrderIds.includes(order.id!)
      );
    });

    console.log('Invoice submitted:', this.invoice);
    console.log('Selected orders:', this.invoice.orders);

    this.dataService.saveInvoice(this.invoice).subscribe({
      next: (response) => {
        console.log('Invoice saved successfully:', response);
        this.toastService.success('Invoice saved successfully!');
        // Reset form after successful submission
        this.resetForm();
      },
      error: (error) => {
        console.error('Error saving invoice:', error);
        this.toastService.error('Error saving invoice');
      },
    });
  }

  resetForm(): void {
    this.invoice = {
      createdAt: new Date(),
      expiryAt: new Date(),
      orders: [],
      paid: false, // Default to false
    };
    this.selectedOrderIds = [];
  }
}
