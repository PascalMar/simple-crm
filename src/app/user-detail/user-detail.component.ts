import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from '../firebase-services/user-list.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userList: User[] = [];

  constructor(private route: ActivatedRoute, public userService: UserListService) { }


}
