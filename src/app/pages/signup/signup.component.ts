import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'abc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  confirmPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmPasswordValidator]],
      email: [null, [Validators.required]],
      contactPrefix: ['+65'],
      contact: [null]
    });
  }

  updateConfirmPasswordValidator(): void {
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  async signUp() {
    await this.userService.register(this.form.value);
    this.router.navigate(['/movies']);
  }

}
