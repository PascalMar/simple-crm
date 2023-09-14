import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/app/models/user.interface';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {


  userList: User[] = [];




  constructor(public dialog: MatDialog, public userService: UserListService) {
    
   }



  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }


  getList() {
    return this.userService.user;
  }
}
