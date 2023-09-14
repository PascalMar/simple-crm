import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
@Injectable({
    providedIn: 'root'
})

export class UserListService {

    user: User[] = [];

    unsubUser;

    firestore: Firestore = inject(Firestore)

    constructor() {
        this.unsubUser = this.subUserList();
    }
    ngonDestroy() {
        this.unsubUser();
    }

    getUserRef() {
        return collection(this.firestore, 'user')
    }

    getSingleDocRef(colId: string, docId: string) {
        return doc(collection(this.firestore, colId), docId)
    }

    setNoteObject(obj: any, id: string): User {
        return {
            firstName: obj.firstName || "",
            lastName: obj.lastName || "",
            email: obj.email || "",
            birthDate: obj.birthDate || "",
            street: obj.street || "",
            zipCode: obj.zipCode || "",
            city: obj.city || "",
        }
    }

    subUserList() {
        return onSnapshot(this.getUserRef(), (list) => {
            this.user = [];
            list.forEach(element => {
                this.user.push(this.setNoteObject(element.data(), element.id));
                console.log(element.id);
            });
        });
    }

    async addUser(item: {}) {
        await addDoc(this.getUserRef(), item).catch(
            (err) => {
                console.error(err)
            }
        ).then(
            (docRef) => {
                docRef
            }
        )
    }
}

