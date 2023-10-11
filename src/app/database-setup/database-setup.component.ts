import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-database-setup',
  template: '',
})
export class DatabaseSetupComponent implements OnInit {

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    const dummyData = require('./dummyData.json').orders;

    dummyData.forEach((order:any) => {
      this.firestore.collection('orders').add(order)
        .then(() => console.log('Dummy-Daten erfolgreich hinzugefügt'))
        .catch(error => console.error('Fehler beim Hinzufügen der Dummy-Daten:', error));
    });
  

    console.log('Dummy-Daten erfolgreich hinzugefügt.');
  }
}