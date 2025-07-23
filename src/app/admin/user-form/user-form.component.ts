import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() userAdded = new EventEmitter<User>();
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    role: '',
  };
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    // Emit the user data when the form is submitted
    this.userAdded.emit(this.user);
    // Reset the form or perform any additional actions as needed
    this.resetForm();
    console.log('User submitted:', this.user);
  }
  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      role: '',
    };
  }
}
