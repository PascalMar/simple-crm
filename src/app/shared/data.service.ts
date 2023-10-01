import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
const dummyData: any[] = require('./data-iboXf0ySthkbcKLVOH5Y-.json');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) {
    this.addDummyData();
  }

  addDummyData() {
    console.log('addDummyData wird aufgerufen'); // Überprüfe, ob diese Ausgabe erscheint
    dummyData.forEach(data => {
      console.log('Versuche, Daten hinzuzufügen:', data); // Überprüfe, ob diese Ausgabe erscheint
      this.firestore.collection('orders').add(data).then(docRef => {
        console.log('Datensatz erfolgreich hinzugefügt mit der ID:', docRef.id);
      }).catch(error => {
        console.error('Fehler beim Hinzufügen des Datensatzes:', error);
      });
    });
  }
  
}
