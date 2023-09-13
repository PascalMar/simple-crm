import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, collectionData, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;

  items$;
  items;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.items$ = collectionData(this.getUserRef())
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    })
    this.items.unsubscribe();
  }


  addUser() {
    const birthDateTimestamp = this.birthDate.getTime();
    const userData = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      street: this.user.street,
      birthDate: birthDateTimestamp,
      zipCode: this.user.zipCode,
      city: this.user.city,

    };
    this.saveUser(userData);
  }

  async saveUser(item: {} = {}) {
    await addDoc(this.getUserRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log("Document written with ID: ", docRef?.id); }
    )
  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }



  getCollection() {
    return collection(this.firestore, 'items');
  }
}
