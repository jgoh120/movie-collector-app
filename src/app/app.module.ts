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
import { AuthInterceptor } from './auth.interceptor';
import { MovieComponent } from './movies/movie/movie.component';
import { NewReviewModalComponent } from './new-review-modal/new-review-modal.component';
import { EditReviewModalComponent } from './edit-review-modal/edit-review-modal.component';
import { ConfirmPromptModalComponent } from './confirm-prompt-modal/confirm-prompt-modal.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import en from '@angular/common/locales/en';

registerLocaleData(en);

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

const NZ_MODULES = [
  NzAvatarModule,
  NzDropDownModule,
  NzButtonModule,
  NzLayoutModule,
  NzMenuModule
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
    MovieComponent,
    NewReviewModalComponent,
    EditReviewModalComponent,
    ConfirmPromptModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSliderModule,
    FormsModule,
    NgSelectModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    ...NZ_MODULES
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
