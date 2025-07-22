import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store/store.component';
import { CheckoutComponent } from './store/checkout/checkout.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ProductCardComponent } from './store/product-card/product-card.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { StoreModule } from './store/store.module';
import { AdminModule } from './admin/admin.module';

// Register Italian locale for Euro formatting
registerLocaleData(localeIt);

@NgModule({
  // These components can ONLY be used within this module
  // Each component/directive/pipe can only be declared in ONE module
  // If you want to use these components in other modules, you need to export them
  // These are the "building blocks" that this module owns
  // Within the same module, all declared components can use each other's selectors in their templates.
  declarations: [AppComponent, LoginComponent],
  // Importing a module makes its exported declarations available in your module
  // BrowserModule is required for running in a browser (includes CommonModule)
  // HttpClientModule makes HttpClient service available
  // FormsModule enables two-way data binding with [(ngModel)]
  // My SharedModule exports common components used across the app
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    StoreModule,
    AdminModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it-IT' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * // If SharedModule exports CartSummaryComponent
@NgModule({
  declarations: [CartSummaryComponent],
  exports: [CartSummaryComponent]  // Makes it available to importing modules
})
export class SharedModule {}

// Then in AppModule, you can use <cart-summary> in templates of:
// - AppComponent
// - StoreComponent  
// - CheckoutComponent
// - LoginComponent
 */
