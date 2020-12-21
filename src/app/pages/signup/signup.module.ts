import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';

const NZ_MODULES = [
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzButtonModule,
  NzCheckboxModule,
  NzCardModule,
  NzSelectModule
];

@NgModule({
  imports: [
    SignupRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ...NZ_MODULES
  ],
  declarations: [
    SignupComponent
  ],
  exports: [
    SignupComponent
  ]
})
export class SignupModule { }
