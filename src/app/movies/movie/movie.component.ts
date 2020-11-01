import { Component, OnInit } from '@angular/core';
import { Movie, MovieRatingStatistics, MovieService, MovieStatistics } from 'src/app/movie.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReviewAuthor, ReviewPagination, ReviewService, ReviewsPage } from 'src/app/review.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewReviewModalComponent } from 'src/app/new-review-modal/new-review-modal.component';
import { AuthService } from 'src/app/auth.service';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';
import { EditReviewModalComponent } from 'src/app/edit-review-modal/edit-review-modal.component';


@Component({
  selector: 'abc-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie;

  reviewsPage$: Observable<ReviewsPage>;

  paginationSubject: BehaviorSubject<ReviewPagination> = new BehaviorSubject({
    sortBy: 'createdAt',
    direction: 'desc',
    limit: 2,
    page: 1,
    filter: {
      author: undefined,
      rating: undefined
    }
  });

  currentUserId$: Observable<string>;

  statistics$: Observable<MovieStatisticsWithRatio>;

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
      this.reviewsPage$ = this.paginationSubject.asObservable().pipe(
        switchMap(pagination => this.reviewService.getReviewsPage(params.id, pagination)),
        share()
      );

      this.statistics$ = this.reviewsPage$.pipe(
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

  changePage(page: number) {
    this.paginationSubject.next({
      ...this.paginationSubject.value,
      page
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
    this.paginationSubject.next({
      ...this.paginationSubject.value,
      filter: {
        ...this.paginationSubject.value.filter,
        rating: stars
      }
    });
  }

  setAuthorFilter(author: ReviewAuthor) {
    this.paginationSubject.next({
      ...this.paginationSubject.value,
      filter: {
        ...this.paginationSubject.value.filter,
        author: author
      }
    });
  }

}

type MovieStatisticsWithRatio = MovieStatistics & {
  rating: MovieRatingStatistics & {
    distributionRatio: number[];
  }
};
