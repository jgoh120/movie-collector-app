import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMovieModalComponent } from '../new-movie-modal/new-movie-modal.component';
import { EditMovieDetailComponent } from '../edit-movie-detail/edit-movie-detail.component';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../user.service';


@Component({
  selector: 'abc-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;

  user$: Observable<User>;

  constructor(
    private movieService: MovieService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.user$ = this.authService.currentUser$;
    this.movies$ = this.movieService.getAll();
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
    if (confirm("Are you sure you want to delete?")) {
      await this.movieService.delete(id);
    }
  }

}
