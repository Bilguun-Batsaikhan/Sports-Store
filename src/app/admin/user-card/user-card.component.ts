import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { GoldUserService } from 'src/app/service/gold-user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  @Output() userAddedtoGold = new EventEmitter<User>();
  constructor(private goldUserService: GoldUserService) {}

  ngOnInit(): void {}

  addToGoldUsers(): void {
    const goldUser = {
      user: this.user,
      goldMemberSince: new Date(),
    };
    this.goldUserService.addGoldUser(goldUser);
    this.userAddedtoGold.emit(this.user);
  }
}
