import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  isLogin : boolean = true;

  ngOnInit() {
    if(localStorage.getItem('currentUser') == null){
      this.isLogin = false;
    } 
    console.log('navigation created');
  }

}
