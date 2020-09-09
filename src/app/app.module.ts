import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditMovieDetailComponent } from './edit-movie-detail/edit-movie-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewMovieModalComponent } from './new-movie-modal/new-movie-modal.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './auth.interceptor';
import { MovieComponent } from './movies/movie/movie.component';
import { NewReviewModalComponent } from './new-review-modal/new-review-modal.component';
import { EditReviewModalComponent } from './edit-review-modal/edit-review-modal.component';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ReviewsComponent,
    MoviesComponent,
    EditMovieDetailComponent,
    NewMovieModalComponent,
    LoginComponent,
    SignupComponent,
    MovieComponent,
    NewReviewModalComponent,
    EditReviewModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
