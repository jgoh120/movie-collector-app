import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path:'**', redirectTo:'/home' },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
