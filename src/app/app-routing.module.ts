import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeComponent } from './home/home.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { EditMovieDetailComponent } from './edit-movie-detail/edit-movie-detail.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { AuthGuard } from './helper/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'movies',
    component: MoviesComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  },
  {
    path: 'new-movie',
    component: NewMovieComponent,
    canActivate: [AuthGuard]
    // data: { title: 'Add Movie' }
  },
  {
    path: 'movies-list',
    component: MoviesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-movie/:id',
    component: EditMovieDetailComponent
    // data: { title: 'Edit Sales'}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
    
  },
  {
    path:'**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
