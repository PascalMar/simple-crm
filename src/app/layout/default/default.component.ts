import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  currentUserName: string = '';
  activeItem: string = '' ;

  constructor(private authService: AuthService) { }

  
  handleItemClick(itemName: string) {
    this.activeItem = itemName;
  }



  logout() {
    this.authService.logout();
  }

}
