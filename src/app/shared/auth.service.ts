import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore,) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res: any) => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/verify-email']);
      }
    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          // Access the registered user's UID
          const uid = res.user.uid;
          console.log(res.user);

          // Create a user document in the 'users' collection
          const userData = {
            email: email, // You can add more user data here if needed
          };
          this.firestore
            .collection('users')
            .doc(uid) // Use the UID as the document ID
            .set(userData)
            .then(() => {
              alert('Registration Successful');
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
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }



  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, (err: { message: any; }) => {
      alert(err.message);
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
      alert(err.message);
    })
  }


}
