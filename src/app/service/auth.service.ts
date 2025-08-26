import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../model/loginRequest.model';
import { LoginResponse } from '../model/loginResponse.model';
import { Router } from '@angular/router';
import { UserDto } from '../model/user-dto';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Using local mock auth; no HTTP calls

  //Oggetto che mantiene sempre l'ultimo valore emesse e lo fornisce a chi si iscrive
  //Mantiene lo stato corrente dell'utente loggato
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);

  //asObservable restituisce una versione read-only del behavior subject, ovvero un observable
  //il $ nel nome è una convenzione di naming per indicare che la variabile è un observable
  public currentUser$ = this.currentUserSubject.asObservable();

  //Serve ad esporre lo stato dell'utente loggato all'esterno della classe in modo sicuro.

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    this.loadUser();
  }

  private loadUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const { username, password } = request;
    if (username === 'admin' && password === 'admin') {
      const user: UserDto = {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
      };
      const token = 'mock-token-admin';
      // store immediately to keep behavior similar
      this.setUser(user, token);
      return of({ token, user });
    }
    return throwError(() => ({ error: { message: 'Invalid credentials' } }));
  }

  setUser(user: UserDto, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
    this.cartService.clear();
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return this.token !== null;
  }
}
