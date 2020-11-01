import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class ReviewService {
  
  private reviewChange: BehaviorSubject<void>;

  constructor(
    private http: HttpClient
  ) { 
    this.reviewChange = new BehaviorSubject(null);
  }

  async create(movieId: string, review: NewReview): Promise<void> {
    await this.http.post(`${environment.apiUrl}/movies/${movieId}/reviews`, review, { responseType: 'text' }).toPromise();
    this.reviewChange.next();
  }

  getReviewsPage(movieId: string, pagination: ReviewPagination): Observable<ReviewsPage> {

    const params = {
      sortBy: pagination.sortBy,
      direction: pagination.direction,
      limit: pagination.limit + '',
      page: pagination.page + '',
    };

    if (pagination.filter.author) {
      params['filterAuthorId'] = pagination.filter.author.id;
    }

    if (pagination.filter.rating) {
      params['filterRating'] = pagination.filter.rating + '';
    }

    return this.reviewChange.asObservable().pipe(
      mergeMap(() => this.http.get<ReviewsPage>(`${environment.apiUrl}/movies/${movieId}/reviews`, { params }))
    );    
  }

  public getById(movieId: string, id: string): Promise<Review> {
    return this.http.get<Review>(`${environment.apiUrl}/movies/${movieId}/reviews/${id}`).toPromise();
  }

  public async update(movieId: string, id: string, review: NewReview): Promise<void> {
    await this.http.put(`${environment.apiUrl}/movies/${movieId}/reviews/${id}`, review, { responseType: 'text' }).toPromise();
    this.reviewChange.next();
  }

  public async delete(movieId: string, id: string): Promise<void> {
    await this.http.delete(`${environment.apiUrl}/movies/${movieId}/reviews/${id}`, { responseType: 'text' }).toPromise();
    this.reviewChange.next();
  }
}

export type NewReview = {
  header: string;
  description: string;
  rating: number;
};

export type ReviewAuthor = {
  name: string;
  id: string;
};

export type Review = {
  id: string;
  header:string;
  description: string;
  rating: number;
  author: ReviewAuthor;
};

export type ReviewsPage = {
  reviews: Review[];
  page: number;
  totalCount: number;
}

export type ReviewPagination = {
  sortBy: 'createdAt' | 'rating';
  direction: 'desc' | 'asc';
  limit: number;
  page: number;
  filter: {
    rating: number;
    author: ReviewAuthor;
  }
}