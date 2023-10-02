import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register() {

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

    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';

  }
}
