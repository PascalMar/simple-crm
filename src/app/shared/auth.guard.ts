import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public AuthService: AuthService, public router: Router, private snackBar: MatSnackBar) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.AuthService.loggedIn() !== true) {
      this.snackBar.open('Access Denied, Login is Required to Access This Page!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
      });
      this.router.navigate(['sign-in']);
    }
    return true;
  }
}