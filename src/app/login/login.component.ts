import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { signInAnonymously } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  title = 'Login' ; 

  constructor(private auth: AuthService, private router: Router) { }

  guestLogin() {
    this.auth.guestLogin();    
    
  }

  login() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
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
