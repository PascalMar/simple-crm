import { Injectable } from '@angular/core';
import { Firestore, getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc } from 'firebase/firestore'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployService {
  db: Firestore;

  empCol: CollectionReference<DocumentData>;
  userCol: CollectionReference<DocumentData>;
  empCollectiondata: any = [];
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();
  private dataSubject = new Subject<any>();

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.db = getFirestore();
    this.userCol = collection(this.db, 'users');
    this.empCol = collection(this.db, 'employee');
    onSnapshot(this.empCol, (snapshot) => {
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

  async addEmployee(data: any) {
    await addDoc(this.empCol, data)
    return;
  }

  async getEmployees() {
    try {
      const collectionRef = this.firestore.collection('employee');
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

  async deleteEmployee(docId: string) {
    const docRef = doc(this.db, 'employee', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateEployee(docId: string, data: any) {
    const docRef = doc(this.db, 'employee', docId);
    await updateDoc(docRef, data)
    return;
  }

  async updateUserProfile(docId: string, data: any) {
    const docRef = doc(this.db, 'users', docId);
    await updateDoc(docRef, data)
    return;
  }

  async getUserById(docId: string) {
    const docRef = doc(this.userCol, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, you can access its data using docSnap.data()
      const UserData = docSnap.data();
      return UserData;
    } else {
      // Document does not exist
      return null;
    }
  }

  getChartInfo() {
    return this.http.get("http://localhost:3000/sales");

  }

  getCustomerInfo() {
    return this.http.get("http://localhost:3000/customer")
  }
}
