import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/loginRequest.model';
import { LoginResponse } from '../model/loginResponse.model';
import { Router } from '@angular/router';
import { UserDto } from '../model/user-dto';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  //Oggetto che mantiene sempre l'ultimo valore emesse e lo fornisce a chi si iscrive
  //Mantiene lo stato corrente dell'utente loggato
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);

  //asObservable restituisce una versione read-only del behavior subject, ovvero un observable
  //il $ nel nome è una convenzione di naming per indicare che la variabile è un observable
  public currentUser$ = this.currentUserSubject.asObservable();

  //Serve ad esporre lo stato dell'utente loggato all'esterno della classe in modo sicuro.

  constructor(
    private http: HttpClient,
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
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
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
