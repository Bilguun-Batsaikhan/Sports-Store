import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/model/user-dto';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Navigation state
  activeRoute: string = 'products';
  // Navbar items

  // Authentication state
  isLoggedIn: boolean = false;
  currentUser: UserDto | null = null;

  navbarItems: { name: string; icon: string; route: string }[] = [];
  private authSubscription: Subscription = new Subscription();
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize with products as active route
    this.activeRoute = 'products';

    // Subscribe to authentication state changes
    this.authSubscription = this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.currentUser = user ? user : null;
      this.updateNavbarItems(); // Update navbar items when user changes
    });
  }

  private updateNavbarItems(): void {
    this.navbarItems = [
      { name: 'Products', icon: 'fas fa-shopping-bag me-1', route: 'products' },
      {
        name: this.currentUser?.role === 'admin' ? 'Invoices' : 'Payment Due',
        icon: 'fas fa-file-invoice me-1',
        route: 'invoices',
      },
      {
        name: this.currentUser?.role === 'admin' ? 'Orders' : 'My Orders',
        icon: 'fas fa-receipt me-1',
        route: 'orders',
      },
    ];
    if (this.currentUser?.role === 'admin') {
      this.navbarItems.push({
        name: 'Users',
        icon: 'fa-solid fa-users',
        route: 'users',
      });
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  // Navigation methods
  setActiveRoute(route: string): void {
    this.activeRoute = route;
    if (route === 'products') {
      this.router.navigate(['products']);
    } else if (route === 'invoices') {
      this.router.navigate(['invoices']);
    } else {
      this.router.navigate([`admin/${route}`]);
    }
  }

  // Authentication methods
  login(): void {
    console.log('Navigate to login page');
    this.router.navigate(['/login']);
  }

  logout(): void {
    console.log('Logout clicked');
    this.authService.logout();
    // Note: AuthService.logout() already handles:
    // - Clearing localStorage
    // - Updating currentUser$ to null
    // - Navigation to home page
  }

  // User profile methods
  viewProfile(): void {
    console.log('View profile clicked');
    // TODO: Implement profile view logic
  }

  viewOrders(): void {
    console.log('View orders clicked');
    this.setActiveRoute('orders');
    // TODO: Implement orders view logic
  }
}
