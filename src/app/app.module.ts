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

// Register Italian locale for Euro formatting
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    CheckoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it-IT' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
