import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() productAdded: EventEmitter<Product> = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  addProductToCart(): void {
    // this.cartService.addLine(this.product, 1);
    this.productAdded.emit(this.product);
    // console.log(`Product ${this.product.name} added to cart!`);
  }
}
