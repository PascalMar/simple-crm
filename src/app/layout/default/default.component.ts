import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/auth.service';
import { EmployService } from 'src/app/shared/employ.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  currentUserName: string = ''; 
  profiledata: any ;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private empService: EmployService) { }

  ngOnInit(): void {
    this.getCurrentUserUid();
  }




  logout() {
    this.authService.logout();
  }

  async getUserById(uid: string) {
    try {
      this.profiledata = await this.empService.getUserById(uid);
      if (this.profiledata) {
        // Data exists, you can use it here
        console.log('Employee data:', this.profiledata);

      } else {
        // Handle the case where the document does not exist
        console.log('Employee not found');
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching employee data:', error);
    }
  }

  getCurrentUserUid() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {   
        this.getUserById(user.uid);
        console.log('Current User UID: ', user.uid);

      } else {
        // User is not logged in
        console.log('User is not logged in');
      }
    });
  }

}
