import { Injectable } from '@angular/core';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc } from 'firebase/firestore'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  db: Firestore;
  orderCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor(private http: HttpClient) {
    this.db = getFirestore();
    // this.orderCol = collection(this.db, 'orders');
    this.orderCol = collection(this.db, 'orders');
    onSnapshot(this.orderCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  getFirestore() {
  }

  async addOrder(data: any) {
    await addDoc(this.orderCol, data)
    return;
  }

  async getOrder() {
    const snapshot = await getDocs(this.orderCol);
    return snapshot;
  }

  async deleteOrder(docId: string) {
    const docRef = doc(this.db, 'orders', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateOrder(docId: string, data: any) {
    const docRef = doc(this.db, 'orders', docId);
    await updateDoc(docRef, data)
    return;
  }

}
