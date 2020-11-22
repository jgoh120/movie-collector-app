import { Component, OnInit } from '@angular/core';
import { MovieService, MoviePagination, MoviesPage, MovieFilter } from '../movie.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMovieModalComponent } from '../new-movie-modal/new-movie-modal.component';
import { EditMovieDetailComponent } from '../edit-movie-detail/edit-movie-detail.component';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { share, switchMap, map, startWith } from 'rxjs/operators';
import { User } from '../user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'abc-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  moviesPage$: Observable<MoviesPage>;

  paginationSubject: BehaviorSubject<MoviePagination> = new BehaviorSubject({
    sortBy: 'createdAt',
    direction: 'desc',
    limit: 5,
    page: 1
  });

  filterForm: FormGroup;
  filterSliderOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 1
  };

  genres = ['Action', 'Drama', 'Comedy', 'Romance', 'Horror'];

  user$: Observable<User>;


  constructor(
    private movieService: MovieService,
    private modalService: NgbModal,
    private authService: AuthService,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {

    this.filterForm = this.formBuilder.group({
      rating: new FormControl([1, 5]),
      genre: [[]]
    });

    this.user$ = this.authService.currentUser$;

    const filter: Observable<MovieFilter> = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      map(formValue => ({
        genre: formValue.genre,
        minRating: formValue.rating[0],
        maxRating: formValue.rating[1]
      }))
    )
    
    this.moviesPage$ = combineLatest([this.paginationSubject.asObservable(), filter]).pipe(
      switchMap(obs => this.movieService.getMoviesPage(obs[0], obs[1])),
      share()
    );
  }

  changePage(page: number) {
    this.paginationSubject.next({
      ...this.paginationSubject.value,
      page
    });
  }

  ngOnInit() { }

  presentCreateMovieModal() {
    const modal = this.modalService.open(NewMovieModalComponent, {
      size: 'lg'
    });
  }

  presentEditMovieModal(id: string) {
    const modal = this.modalService.open(EditMovieDetailComponent, {
      size: 'lg'
    });
    modal.componentInstance.movieId = id;
  }

  async deleteMovie(id) {
    this.commonService.presentConfirmModal({
      title: "Delete movie?",
      description: "Are you sure you want to delete this? ",
      confirm: {
        label: "Confirm", 
        handler: ()=> this.movieService.delete(id)
      },
      cancel: {
        label: "Cancel",
        handler: ()=> {}
       }
    })
  }
}