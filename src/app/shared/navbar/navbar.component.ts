import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Navigation state
  activeRoute: string = 'products';

  // Authentication state
  isLoggedIn: boolean = false;
  currentUser: string = '';
  private authSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize with products as active route
    this.activeRoute = 'products';

    // Subscribe to authentication state changes
    this.authSubscription = this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.currentUser = user ? user.username || user.email || 'User' : '';
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  // Navigation methods
  setActiveRoute(route: string): void {
    this.activeRoute = route;
    this.router.navigate([`/${route}`]);
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
