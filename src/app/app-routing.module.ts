import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './store/checkout/checkout.component';
import { StoreComponent } from './store/store/store.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { InvoicesComponent } from './invoice/invoices/invoices.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'products',
    component: StoreComponent,
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
