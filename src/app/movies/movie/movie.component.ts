import { Component, OnInit } from '@angular/core';
import { Movie, MovieRatingStatistics, MovieService, MovieStatistics } from 'src/app/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Review, ReviewService } from 'src/app/review.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewReviewModalComponent } from 'src/app/new-review-modal/new-review-modal.component';
import { AuthService } from 'src/app/auth.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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

  statistics$: Observable<MovieStatisticsWithRatio>;

  ratingFilter: number = 0;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private modalService: NgbModal,
    private commonService: CommonService,
    private authService: AuthService
  ) {

    this.currentUserId$ = this.authService.currentUser$.pipe(
      map(user => user.id)
    );

    this.activatedRoute.params.subscribe(async params => {
      this.movie = await this.movieService.getById(params.id);
      this.reviews$ = this.reviewService.getByMovieId(params.id);

      this.statistics$ = this.reviews$.pipe(
        switchMap(() => this.movieService.getStatisticsById(params.id)),
        filter(stats => stats != null),
        map(stats => {
          const reverseDistribution = stats.rating.distribution.reverse();
          return {
            ...stats,
            rating: {
              ...stats.rating,
              distribution: reverseDistribution,
              distributionRatio: reverseDistribution.map(c => c / stats.rating.count)
            }
          };
        })
      );
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

  async deleteReview(id) {
    this.commonService.presentConfirmModal({
      title: "Delete review?",
      description: "Are you sure you want to delete this? ",
      confirm: {
        label: "Confirm", 
        handler: ()=> this.reviewService.delete(this.movie.id, id)
      },
      cancel: {
        label: "Cancel",
        handler: ()=> {}
       }
    })
    // if (confirm("Are you sure you want to delete this review?")) {
    //   await this.reviewService.delete(this.movie.id,id);
    // }
  }

  setRatingFilter(stars: number) {
    this.ratingFilter = stars;
  }

}

type MovieStatisticsWithRatio = MovieStatistics & {
  rating: MovieRatingStatistics & {
    distributionRatio: number[];
  }
};
