import { Injectable } from '@angular/core';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc } from 'firebase/firestore'
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployService {
  db: Firestore;

  empCol: CollectionReference<DocumentData>;
  userCol : CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor() {  
    this.db = getFirestore();
    this.userCol = collection(this.db , 'users');
    this.empCol = collection(this.db, 'employee');
    onSnapshot(this.empCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }


  getFirestore() {

  }

  async addEmployee(data: any) {
    await addDoc(this.empCol, data)
    return;
  }

  async getEmployees() {
    const snapshot = await getDocs(this.empCol);
    return snapshot;
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

  async updateUserProfile(docId: string,data:any) {    
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




}
