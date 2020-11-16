import { Component, OnInit } from '@angular/core';
import { MovieService, MoviePagination, MoviesPage } from '../movie.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMovieModalComponent } from '../new-movie-modal/new-movie-modal.component';
import { EditMovieDetailComponent } from '../edit-movie-detail/edit-movie-detail.component';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { User } from '../user.service';

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
    limit: 2,
    page: 1,
    filter: {
      genre: undefined,
      minRating: undefined,
      maxRating: undefined
    }
  });

  user$: Observable<User>;


  constructor(
    private movieService: MovieService,
    private modalService: NgbModal,
    private authService: AuthService,
    private commonService: CommonService
  ) {

    this.user$ = this.authService.currentUser$;
    
    this.moviesPage$ = this.paginationSubject.asObservable().pipe(
      switchMap(pagination => this.movieService.getMoviesPage(pagination)),
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
  
  setGenreFilter(genre: string[]) {
    this.paginationSubject.next({
      ...this.paginationSubject.value,
      filter: {
        ...this.paginationSubject.value.filter,
        genre: genre
      }
    });
  }
}