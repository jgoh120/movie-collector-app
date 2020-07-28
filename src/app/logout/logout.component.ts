import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authetication.service';

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

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

}
