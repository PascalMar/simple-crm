import { Injectable } from '@angular/core';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  db: Firestore;

  customerCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor() {
    this.db = getFirestore();
    this.customerCol = collection(this.db, 'customer');
    onSnapshot(this.customerCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  getFirestore() {

  }

  async addCustomer(data: any) {
    await addDoc(this.customerCol, data)
    return;
  }

  async getCustomer() {
    const snapshot = await getDocs(this.customerCol);
    return snapshot;
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
