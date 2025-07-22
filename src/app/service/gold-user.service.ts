import { Injectable } from '@angular/core';
import { GoldUser } from '../model/gold-users';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class GoldUserService {
  goldUsers: GoldUser[] = [];
  constructor(private toastService: ToastService) {}

  addGoldUser(user: GoldUser): void {
    this.goldUsers.push(user);
    this.toastService.show(`User ${user.user.username} added to Gold Users`);
  }

  removeGoldUser(userId: number): void {
    this.goldUsers = this.goldUsers.filter(
      (goldUser) => goldUser.user.id !== userId
    );
  }
}
