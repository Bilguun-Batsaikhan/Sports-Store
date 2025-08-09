import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/service/data-service.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filterByRole: string = '';

  // readonly dialog = inject(MatDialog);
  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: {
        /* optional data */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed', result);
    });
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

  onUserAdded(user: User) {
    // handle user added
    this.users.push(user);

    console.log('User added:', user);
  }
}
