import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from 'src/app/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Review, ReviewService } from 'src/app/review.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewReviewModalComponent } from 'src/app/new-review-modal/new-review-modal.component';
import { AuthService } from 'src/app/auth.service';
import { map } from 'rxjs/operators';
import { EditReviewModalComponent } from 'src/app/edit-review-modal/edit-review-modal.component';

@Component({
  selector: 'abc-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie;

  reviews$: Observable<Review[]>;

  currentUserId$: Observable<string>;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {

    this.currentUserId$ = this.authService.currentUser$.pipe(
      map(user => user.id)
    );

    this.activatedRoute.params.subscribe(async params => {
      this.movie = await this.movieService.getById(params.id);
      this.reviews$ = this.reviewService.getByMovieId(params.id);
    });
  }

  ngOnInit(): void {
  }

  presentCreateReviewModal() {
    const modal = this.modalService.open(NewReviewModalComponent, {
      size: 'lg'
    });
    modal.componentInstance.movieId = this.movie.id;
  }

  presentEditReviewModal(id: String){
    const modal = this.modalService.open(EditReviewModalComponent,{
      size: 'lg'
    });
    modal.componentInstance.reviewId = id;
    modal.componentInstance.movieId = this.movie.id;
  }

}
