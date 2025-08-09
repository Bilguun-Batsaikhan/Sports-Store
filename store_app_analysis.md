# Store Component

```typescript
export class StoreComponent implements OnInit {
  constructor(
    private productRepository: ProductRepositoryService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}
```

This component `implements` OnInit meaning we've to write explicitely even though the method definitions are implemented without body by Angular.

Constructor is a starting point of any object initialization, so it's the first method to be called. Inside it we have three distinct services that are utilized by this component which I'll dive into details later on.

## Pagination

```typescript
productsPerPage: number = 8;
selectedPage: number = 1;
```

```html
<div class="d-flex justify-content-center mt-4" *ngIf="totalPages > 1">
  <!-- Content inside will show as flex item -->
</div>
```

Here I've used `get` method so that I can treat this method as a normal field inside the template. Total products will be returned based on selected category then I'm calculating length of the returned array. After that by dividing the number of total products with products per page we can calculate total number of pages. If you have 17 products and 8 products per page: `17 ÷ 8 = 2.125` → `Math.ceil(2.125) = 3` pages

```typescript
get totalPages(): number {
    const totalProducts = this.productRepository.getProducts(
      this.selectedCategory
    ).length;
    return Math.ceil(totalProducts / this.productsPerPage);
}
```

```html
<ul class="pagination">
  <li class="page-item" [class.disabled]="selectedPage === 1">
    <button class="page-link" (click)="changePage(selectedPage - 1)">Previous</button>
  </li>
  <li class="page-item" *ngFor="let page of getPages()" [class.active]="page === selectedPage">
    <button class="page-link" (click)="changePage(page)">{{ page }}</button>
  </li>
  <li class="page-item" [class.disabled]="selectedPage === totalPages">
    <button class="page-link" (click)="changePage(selectedPage + 1)">Next</button>
  </li>
</ul>
```

When using pagination with Bootstrap framework, you'll typically use `ul` tag with `pagination` class then populate it with `li` along with `a` tags nested in it. In this case I didn't use `a` tag instead used `page-item` and `page-link` bootstrap classes.

`page-item` and `page-link` are Bootstrap CSS classes specifically designed for pagination components.

`page-item`

- Applied to `<li>` elements in pagination
- Provides basic styling for pagination list items
- Works with modifiers like:
  - active - highlights the current page
  - disabled - grays out and disables interaction

`page-link`

- Applied to clickable elements inside page-item (buttons/links)
- Provides the actual clickable styling
- Handles hover effects, focus states, and visual appearance

Now that explained let's move on to Angular's **conditional class binding** `[class.disabled]="selectedPage === 1"`. Basically says: if selectedPage property in component.ts file is equals to 1 then add disabled. Because I don't want the internal link `Previous` to be clickable when are already at the first page.

`(click)="changePage(selectedPage - 1)"` since the button is for previous page subtract one. When `click` event happens it calls `changePage` method which basically updates value of `selectedPage`.

```typescript
changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.selectedPage = page;
    }
}
```

Then we've this part which represents the clickable page numbers.

```html
<li class="page-item" *ngFor="let page of getPages()" [class.active]="page === selectedPage">
  <button class="page-link" (click)="changePage(page)">{{ page }}</button>
</li>
```

Apparently when you're using `*ngFor` it's not always required to be a property, also you can call a function/method.

```typescript
getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
}
```

Now remember that `totalPages` is a get method which we can treat it as a property and it only returns total number pages based on products per page. So if we've 4 pages after the execution of the above method it'll generate `clickable` page numbers looks like this `|1|2|3|4|` more or less... you get the idea.

Lastly I'd like to also understand how to control how many and which items to show when changing a page?

```typescript
  get products(): Product[] {
    const allProducts = this.productRepository.getProducts(
      this.selectedCategory
    );
    const startIndex = (this.selectedPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  }
```

Another get method using `productRepository` to retrieve all or filtered products based on `selectedCategory` property. Here we used `slice` javascript built in function that returns shallow copy of the original array based on start and end indexes where end index is exclusive.

```typescript
const allProducts = [product1, product2, ..., product25]; // 25 products
const selectedPage = 2;
const productsPerPage = 8;

const startIndex = (2 - 1) * 8 = 8;  // Start at index 8
const endIndex = 8 + 8 = 16;         // End at index 16

const pageProducts = allProducts.slice(8, 16);
// Returns products at indexes 8, 9, 10, 11, 12, 13, 14, 15
// That's 8 products for page 2
```

## Category Sidebar

Use `<a>`s or `<button>`s to create actionable list group items with hover, disabled, and active states by adding .list-group-item-action. We separate these pseudo-classes to ensure list groups made of non-interactive elements (like `<li>`s or `<div>`s) don’t provide a click or tap affordance.

[Official documentation](https://getbootstrap.com/docs/4.0/components/list-group/)

```html
<div class="col-md-3 col-lg-2 bg-light p-3" *ngIf="selectedInvoice === ''">
  <h5 class="mb-3">Categories</h5>
  <div class="list-group">
    <button class="list-group-item list-group-item-action" [class.active]="selectedCategory === ''" (click)="changeCategory('')">All Products</button>
    <button *ngFor="let category of categories" class="list-group-item list-group-item-action" [class.active]="selectedCategory === category" (click)="changeCategory(category)">{{ category }}</button>
  </div>
</div>
```

To create a sidebar this whole `div` is nested inside a `row` then `col-md-3`, meaning it'll take 1/4 space of the screen on medium screens. Then I'm using _conditional class binding_ to check selected category. If not selected any category then show "All Products", otherwise shows whatever category that is selected at the moment from categories list with the help of `*ngFor`.

## Header with Cart

By adding `d-flex` all tags inside it will behave like a flex item. Then we've a header `h2` along with an icon from _font awesome_. We've a button for toggling a product form which uses _Angular Material_, we can identify by looking at `mat-raised-button`. Finally there is an another component I've created that acts as a **cart summary**.

```html
<div class="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm rounded">
  <h2 class="mb-0">Sports Store <i class="fa-solid fa-futbol text-primary"></i></h2>
  <div class="d-flex align-items-center">
    <button mat-raised-button color="primary" class="me-4" (click)="showProductForm()">Add new product</button>
    <app-cart-summary></app-cart-summary>
  </div>
</div>
```

## Product Grid

Now as you can see I've created another `row` element, why? Because I want my products to be structured as a grid again within the main content area, after the header. So each product will take 1/4 space on larger screens.

```html
<div class="row">
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4" *ngFor="let product of products">
    <app-product-card [product]="product" (productAdded)="addProductToCart($event)"> </app-product-card>
  </div>
</div>
```

Every product within the products list looks like this.

```typescript
export interface Product {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
}
```

Then we're creating our `app-product-card` by giving **product** information. By using Angular's component communication `@Input` and `@Output` decorators we can:

`[product]="product"` - **@Input (Property Binding)**

- `[product]` - the input property name in the child component
- =`"product"` - the data being passed from parent component
- This sends data **FROM parent TO child**

In `ProductCardComponent`

```typescript
@Input() product!: Product;  // Receives the product data
```

`(productAdded)="addProductToCart($event)"` - **@Output (Event Binding)**

- `(productAdded)` - the event name in the child component
- `="addProductToCart($event)"` - the method to call in the parent
- `$event` - the data emitted by the child component
- This sends data **FROM child TO parent**

In `ProductCardComponent`

```typescript
@Output() productAdded = new EventEmitter<Product>();  // Emits the product data
// When user clicks "Add to Cart" button:
onAddToCart() {
  this.productAdded.emit(this.product);  // Emits the product to parent
}
```

In `StoreComponent`

```typescript
addProductToCart(product: Product) {
  // Logic to add the product to the cart
  this.cartService.addLine(product, 1);
  this.toastService.success(`${product.name} added to cart!`, 3000);
}
```

## Child Components of StoreComponent

The `StoreComponent` uses two child components: `ProductCardComponent` and `CartSummaryComponent`. Let's briefly discuss each of them.

### ProductCardComponent

This component is responsible for displaying individual product details. It receives a `Product` object as input and emits an event when the user adds the product to the cart.

```html
<div class="card h-100 shadow-sm">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title text-primary">{{ product.name }}</h5>
    <p class="card-text text-muted">{{ product.description }}</p>
    <div class="mt-auto">
      <p class="card-text">
        <strong class="text-success fs-4">{{ product.price | currency : "EUR" : "symbol" : "1.2-2" }}</strong>
      </p>
      <button class="btn btn-primary w-100" (click)="addProductToCart()"><i class="fas fa-cart-plus me-2"></i>Add to Cart</button>
    </div>
  </div>
</div>
```

This template uses Bootstrap classes, especially `card` classes to create a card-like layout for each product. Also notice that it uses Angular's `currency` pipe to format the product price.

Whenever the user clicks the "Add to Cart" button, it calls the `addProductToCart` method which emits the `productAdded` event.

```typescript
addProductToCart() {
  this.productAdded.emit(this.product);
}
```

This allows the parent `StoreComponent` to know exactly which product was added to the cart and handle it accordingly. Perhaps in the future we might need to add certain products to the cart with a different logic such as calculating weight or size, but for now it simply adds _one_ product to the cart.

### CartSummaryComponent

This component displays a summary of the items in the cart. It uses the `CartService` to retrieve the cart items and their total price.

```html
<!-- Cart Icon with Modal Trigger -->
<div class="cart-icon position-relative d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#cartModal" style="cursor: pointer">
  <div class="position-relative me-3">
    <i class="fas fa-shopping-cart fa-2x text-primary"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" *ngIf="itemCount > 0"> {{ itemCount }} </span>
  </div>
  <div class="cart-total" *ngIf="itemCount > 0">
    <div class="text-muted small">Total:</div>
    <div class="text-success fw-bold">{{ cartPrice | currency : "EUR" : "symbol" : "1.2-2" }}</div>
  </div>
</div>
```
