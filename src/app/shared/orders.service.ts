import { Injectable } from '@angular/core';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc } from 'firebase/firestore'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  db: Firestore;

  orderCol: CollectionReference<DocumentData>;
  ordersCollectiondata: any = [];
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();
  private dataSubject = new Subject<any>();

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.db = getFirestore(); 
    this.orderCol = collection(this.db, 'orders');
    onSnapshot(this.orderCol, (snapshot) => {
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

  async addOrders(data: any) {
    await addDoc(this.orderCol, data)
    return;
  }

  async getOrder() {
    try {
      const collectionRef = this.firestore.collection('orders');
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

  async deleteOrder(docId: string) {
    const docRef = doc(this.db, 'orders', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateOrders(docId: string, data: any) {
    const docRef = doc(this.db, 'orders', docId);
    await updateDoc(docRef, data)
    return;
  }

}
