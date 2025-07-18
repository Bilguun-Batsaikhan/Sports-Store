import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../../service/product-repository.service';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';
//   Proprietà:
// ● selectedCategory: string
// ● productsPerPage: number = 4
// ● selectedPage: number
// Metodi:
// ● get products(): Product[]
// ● get categories(): string[]
// ● changeCategory(category)
// ● changePage(page)
// ● addProductToCart(product)
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(
    private productRepository: ProductRepositoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}
  selectedCategory: string = '';
  productsPerPage: number = 4;
  selectedPage: number = 1;

  get cartItemCount(): number {
    return this.cartService.itemCount;
  }

  get products(): Product[] {
    const allProducts = this.productRepository.getProducts(
      this.selectedCategory
    );
    const startIndex = (this.selectedPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  }

  get categories(): string[] {
    return this.productRepository.getCategories();
  }

  get totalPages(): number {
    const totalProducts = this.productRepository.getProducts(
      this.selectedCategory
    ).length;
    return Math.ceil(totalProducts / this.productsPerPage);
  }

  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedPage = 1; // Reset to first page when changing category
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

  addProductToCart(product: Product): void {
    this.cartService.addLine(product, 1);
  }
}
