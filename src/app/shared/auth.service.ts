import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserName: string = '';

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore, private snackBar: MatSnackBar) { }

  guestLogin() {
    this.fireauth.signInAnonymously().then((userCredential) => {
      const user: any = userCredential.user;
      console.log('Anonymous user ID:', user?.uid);
      localStorage.setItem('token', JSON.stringify(user?.uid));
      this.router.navigate(['/dashboard']);
    })
      .catch((error) => {
        console.error('Error signing in anonymously:', error);
      });
  }


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res: any) => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/verify-email']);
      }
    }, (err: { message: any; }) => {
      this.snackBar.open(err.message, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });

      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          const uid = res.user.uid;
          const userData = {
            email: email,
          };
          this.firestore
            .collection('users')
            .doc(uid)
            .set(userData)
            .then(() => {
              this.snackBar.open('successful registration', 'Close', {
                duration: 3000,
                panelClass: ['success-snackbar'],
              });
              this.sendEmailForVarification(res.user);
              this.router.navigate(['/login']);
            })
            .catch((error) => {
              console.error('Error creating user document: ', error);
            });
        } else {
          // Handle the case where res.user is null
          console.error('User object is null');
        }
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/register']);
      });
  }



  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      this.snackBar.open('Something went wrong. Not able to send mail to your email', 'Close', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
    })
  }


  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      this.snackBar.open(err.message, 'Close', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
    })
  }


}
