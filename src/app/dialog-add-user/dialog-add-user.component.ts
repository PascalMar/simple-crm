import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '../firebase-services/user-list.service';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  @Input() user!: User;

  loading = false;

  firstName = "";
  lastName = "";
  birthDate = "";
  street = "";
  zipCode = "";
  city = "";

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userService: UserListService) { }

  addNote() {
    let user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: new Date(this.birthDate).getTime(),
      street: this.street,
      zipCode: parseInt(this.zipCode, 10),
      city: this.city,

    }
    this.userService.addUser(user);
    this.dialogRef.close();
  }


}
