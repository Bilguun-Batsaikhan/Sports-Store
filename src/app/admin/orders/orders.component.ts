import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/model/order';
import { DataService } from 'src/app/service/data-service.service';
import { InvoiceFilterService } from 'src/app/service/invoice-filter.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { UserDto } from 'src/app/model/user-dto';

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
  currentUser: UserDto | null = null;

  private authSubscription: Subscription = new Subscription();
  constructor(
    private dataService: DataService,
    private invoiceFilterService: InvoiceFilterService,
    private toastService: ToastService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user ? user : null;
      console.log('Current user:', this.currentUser);
      this.loadOrders();
    });

    // Subscribe to invoice filter changes
    this.subscription.add(
      this.invoiceFilterService.selectedInvoiceId$.subscribe((invoiceId) => {
        this.selectedInvoiceId = invoiceId;
        this.applyFilter();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  private loadOrders(): void {
    if (this.currentUser?.role === 'admin') {
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
    } else {
      console.log('The current user id is: ' + this.currentUser?.id);
      this.dataService.getOrdersByUserId(this.currentUser?.id!).subscribe({
        next: (orders) => {
          this.allOrders = orders;
          this.applyFilter();
        },
        error: (err) => {
          console.error('Error fetching user orders:', err);
          this.allOrders = [];
          this.filteredOrders = [];
        },
        complete: () => console.log('User orders fetched successfully.'),
      });
    }
  }

  private applyFilter(): void {
    if (this.selectedInvoiceId) {
      // Filter orders by invoice ID (handle both string and number types)
      this.filteredOrders = this.allOrders.filter((order) => {
        // Convert both to string for comparison to handle type mismatches
        const orderInvoiceId = order.invoiceId?.toString();
        const selectedId = this.selectedInvoiceId?.toString();
        return orderInvoiceId === selectedId;
      });

      console.log('Filtering for invoice ID:', this.selectedInvoiceId);
      console.log('Total orders:', this.allOrders.length);
      console.log('Filtered orders:', this.filteredOrders.length);
      console.log(
        'Orders with invoice IDs:',
        this.allOrders.map((o) => ({ id: o.id, invoiceId: o.invoiceId }))
      );
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

  shipOrder(orderId: number): void {
    this.dataService.shipOrder(orderId).subscribe({
      next: (response) => {
        console.log('Order shipped successfully:', response);
        // Reload orders to reflect changes
        this.toastService.success('Order shipped successfully!');
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error shipping order:', error);
        this.toastService.error('Error shipping order');
      },
    });
  }

  openDialog(orderId: number): void {
    const order = this.filteredOrders.find((o) => o.id === orderId);
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: { order: order },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
        // Handle the result from the dialog if needed
      }
    });
  }
}
