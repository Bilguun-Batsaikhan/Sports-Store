import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filterByRole: string = '';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  updateFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterByRole = inputElement.value.toLowerCase();
  }

  get filteredUsers(): User[] {
    if (!this.filterByRole) {
      return this.users;
    }
    return this.users.filter((user) =>
      user.role.toLowerCase().includes(this.filterByRole)
    );
  }

  onUserAdded(user: User): void {
    console.log('User added:', user);
  }
}
