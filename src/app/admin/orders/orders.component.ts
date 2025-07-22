import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/model/order';
import { DataService } from 'src/app/service/data-service.service';
import { InvoiceFilterService } from 'src/app/service/invoice-filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  allOrders: Order[] = []; // Store all orders
  filteredOrders: Order[] = []; // Store filtered orders
  ordersPerPage: number = 5;
  selectedPage: number = 1;
  selectedInvoiceId: string | null = null;
  private subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private invoiceFilterService: InvoiceFilterService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    
    // Subscribe to invoice filter changes
    this.subscription.add(
      this.invoiceFilterService.selectedInvoiceId$.subscribe(invoiceId => {
        this.selectedInvoiceId = invoiceId;
        this.applyFilter();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadOrders(): void {
    this.dataService.getOrders().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.allOrders = [];
        this.filteredOrders = [];
      },
      complete: () => console.log('Orders fetched successfully.'),
    });
  }

  private applyFilter(): void {
    if (this.selectedInvoiceId) {
      // Filter orders by invoice ID (handle both string and number types)
      this.filteredOrders = this.allOrders.filter(order => {
        // Convert both to string for comparison to handle type mismatches
        const orderInvoiceId = order.invoiceId?.toString();
        const selectedId = this.selectedInvoiceId?.toString();
        return orderInvoiceId === selectedId;
      });
      
      console.log('Filtering for invoice ID:', this.selectedInvoiceId);
      console.log('Total orders:', this.allOrders.length);
      console.log('Filtered orders:', this.filteredOrders.length);
      console.log('Orders with invoice IDs:', this.allOrders.map(o => ({ id: o.id, invoiceId: o.invoiceId })));
    } else {
      // Show all orders
      this.filteredOrders = [...this.allOrders];
    }
    
    // Reset pagination when filter changes
    this.selectedPage = 1;
  }

  clearFilter(): void {
    this.invoiceFilterService.clearFilter();
  }

  get loadedOrders(): Order[] {
    const startIndex = (this.selectedPage - 1) * this.ordersPerPage;
    const endIndex = startIndex + this.ordersPerPage;
    return this.filteredOrders.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.ordersPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.selectedPage = page;
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
