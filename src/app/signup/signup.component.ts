import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'abc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
    id: '';
    firstname: '';
    lastname:'';
    username:'';
    password:'';
    organisation: string='';
    email: '';
    contact: '';
    
    constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
          firstname: [null, Validators.required],
          lastname: [null, Validators.required],
          username: [null, Validators.required],
          password: [null, Validators.required],
          organisation: [null, Validators.required],
          email: [null, Validators.required],
          contact:[null, Validators.required]
      });
    } 

  onSubmitNewUser(){
    this.userService.addUser(this.signupForm.value)
      .subscribe((res: any) => {
        //const id = res._id;
        this.router.navigate(['/movies']);
      });
  }


}
