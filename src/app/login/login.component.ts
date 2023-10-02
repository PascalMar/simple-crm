import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  title = 'Login';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  guestLogin() {
    this.auth.guestLogin();

  }

  login() {

    if (this.email == '') {
      this.snackBar.open('Please enter a valid E-Mail', 'Close', {
        duration: 3000, 
        panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
      });
      return;
    }

    if (this.password == '') {
      this.snackBar.open('Please enter a valid Password', 'Close', {
        duration: 3000, 
        panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
      });
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
