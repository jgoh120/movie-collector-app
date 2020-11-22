import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  // {
  //   path: 'movies',
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: MoviesComponent
  //     },
  //     {
  //       path: ':id',
  //       component: MovieComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'reviews',
  //   component: ReviewsComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'edit-movie/:id',
  //   component: EditMovieDetailComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path:'**', redirectTo:'/home' },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
