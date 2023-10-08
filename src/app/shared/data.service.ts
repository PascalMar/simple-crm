import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentUserNameSubject = new BehaviorSubject<string>('Guest');
  currentUserName$: Observable<string> = this.currentUserNameSubject.asObservable();
  private currentUserImageUrlSubject = new BehaviorSubject<string>(''); 
  currentUserImageUrl$: Observable<string> = this.currentUserImageUrlSubject.asObservable();



  updateUserName(newName: string) {
    this.currentUserNameSubject.next(newName);
  }

  updateUserImageUrl(newImageUrl: string) {
    this.currentUserImageUrlSubject.next(newImageUrl);
  }

  constructor(private firestore: AngularFirestore) {

  }



}
