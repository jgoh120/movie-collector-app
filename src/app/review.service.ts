import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })

export class ReviewService {
  
  constructor(
    private http: HttpClient
  ) { }

  async create(movieId: string, review: NewReview): Promise<void> {
    await this.http.post(`${environment.apiUrl}/movies/${movieId}/reviews`, review).toPromise();
  }

  getByMovieId(movieId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/movies/${movieId}/reviews`);
  }


}

export type NewReview = {
  description: string;
  rating: number;
};

export type Review = {
  id: string;
  description: string;
  rating: number;
  authorId: string;
};
