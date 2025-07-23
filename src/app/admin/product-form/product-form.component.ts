import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>();

  product: Product = {
    name: '',
    category: '',
    description: '',
    price: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  onCancel(): void {
    this.closeForm.emit();
  }

  onSubmit(): void {
    console.log('Product created:', this.product);
    // TODO: implement product creation logic here
    this.closeForm.emit();
  }
}
