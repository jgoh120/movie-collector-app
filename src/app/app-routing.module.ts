import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeComponent } from './home/home.component';
import { EditMovieDetailComponent } from './edit-movie-detail/edit-movie-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { MovieComponent } from './movies/movie/movie.component';

const routes: Routes = [
  {
    path: 'movies',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MoviesComponent
      },
      {
        path: ':id',
        component: MovieComponent
      }
    ]
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-movie/:id',
    component: EditMovieDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
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
