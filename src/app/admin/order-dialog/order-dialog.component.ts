import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../model/order';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
})
export class OrderDialogComponent implements OnInit {
  order: Order;

  constructor(
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order }
  ) {
    this.order = data.order;
  }

  ngOnInit(): void {}

  getOrderTotal(): number {
    if (!this.order.lines) return 0;
    return this.order.lines.reduce((total, line) => {
      return total + line.quantity * line.product.price;
    }, 0);
  }

  close() {
    this.dialogRef.close();
  }
}
