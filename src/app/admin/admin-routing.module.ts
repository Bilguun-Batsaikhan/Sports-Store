import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: 'orders', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
