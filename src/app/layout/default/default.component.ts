import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { EmployService } from 'src/app/shared/employ.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  currentUserName: string = '';
  currentUserImageUrl: string = '';
  profiledata: any;

  constructor(private DataService: DataService, private authService: AuthService, private afAuth: AngularFireAuth, private empService: EmployService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.DataService.currentUserName$.subscribe(name => {
      this.currentUserName = name;
    });
    this.DataService.currentUserImageUrl$.subscribe(url => {
      this.currentUserImageUrl = url;
    });
    this.getCurrentUserUid();
  }




  logout() {
    this.authService.logout();
    this.snackBar.open('logged out successfully', 'Close', {
      duration: 3000, // Display the alert for 3 seconds
      panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
    });
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
