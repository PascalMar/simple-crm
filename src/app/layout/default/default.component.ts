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
  profiledata: any;

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
      if (!this.profiledata) {
        this.currentUserName = 'Guest';
      } else {
        this.currentUserName = this.profiledata.Name;
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
      } else {
        this.currentUserName = 'Guest';
        
      }
    });
  }

}
