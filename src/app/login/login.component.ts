import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../model/loginRequest.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    /*if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/store/store'], {
        state: {role: 'admin'}
      });
    } else if (this.username === 'user' && this.password === 'user') {
      this.router.navigate(['/store/store'],{
        state: {role: 'user'}
      });
    } else {
      this.error = 'Credenziali non valide';
    }
 */
    const request: LoginRequest = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        //Salviamo utente e token
        this.authService.setUser(response.user, response.token);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.error = 'Login failed: ' + (err.error?.message || 'Server error');
      },
    });
  }
}
