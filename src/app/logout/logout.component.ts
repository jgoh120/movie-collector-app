import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'abc-logout',
  template: `
    <p>
      logout works!
    </p>
  `,
  styles: [
  ]
})
export class LogoutComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

}
