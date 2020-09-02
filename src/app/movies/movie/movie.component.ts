import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from 'src/app/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Review, ReviewService } from 'src/app/review.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewReviewModalComponent } from 'src/app/new-review-modal/new-review-modal.component';

@Component({
  selector: 'abc-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie;

  reviews$: Observable<Review[]>;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private modalService: NgbModal
  ) {
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

}
