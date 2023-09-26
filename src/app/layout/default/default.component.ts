import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  currentUserName: string = '';

  constructor(private authService: AuthService) { }

  



  logout() {
    this.authService.logout();
  }

}
