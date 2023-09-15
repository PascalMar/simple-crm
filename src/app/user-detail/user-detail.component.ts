import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from '../firebase-services/user-list.service';
import { doc, getDoc, collection } from "firebase/firestore";
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements AfterViewInit {

  // userList: User[] = [];
  selectedUserId: string;

  user:any = {};




  constructor(private route: ActivatedRoute, public userService: UserListService) {

    this.selectedUserId = this.route.snapshot.paramMap.get('id') || '';

  }

  async ngAfterViewInit(): Promise<void> {
    this.pushData(await this.getSingleDocRef())
  }

  async getSingleDocRef() {

    const docRef = doc(collection(this.userService.firestore, 'user'), this.selectedUserId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  pushData(obj: any) {
    this.user.firstName = obj.firstName || "";
    this.user.lastName = obj.lastName || "";
    this.user.email = obj.email || "";
    this.user.birthDate = obj.birthDate || 0;
    this.user.street = obj.street || "";
    this.user.zipCode = obj.zipCode || 0;
    this.user.city = obj.city || "";
    this.user.id = obj.id || "";
  }
}
