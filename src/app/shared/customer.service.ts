import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  db: Firestore;

  customerCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();
  private dataSubject = new Subject<any>();

  constructor( private firestore: AngularFirestore) {
    this.db = getFirestore();
    this.customerCol = collection(this.db, 'customer');
    onSnapshot(this.customerCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  getData() {
    return this.dataSubject.asObservable();
  }

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  getFirestore() {

  }

  async addCustomer(data: any) {
    await addDoc(this.customerCol, data)
    return;
  }

  async getCustomer() {
    try {
      const collectionRef = this.firestore.collection('customer');
      const snapshot = await collectionRef.get().toPromise();

      if (snapshot) {
        return snapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
      } else {
        console.error('Snapshot is undefined.');
        return []; // Return an empty array or handle the error appropriately.
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async deleteCustomer(docId: string) {
    const docRef = doc(this.db, 'customer', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateCustomer(docId: string, data: any) {
    const docRef = doc(this.db, 'customer', docId);
    await updateDoc(docRef, data)
    return;
  }



}
