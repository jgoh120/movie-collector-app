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

  getByMovieId(movieId: string): Observable<Review[]> {
    return this.reviewChange.asObservable().pipe(
      mergeMap(() => this.http.get<Review[]>(`${environment.apiUrl}/movies/${movieId}/reviews`))
    );    
  }

  public getById(movieId: String, id: string): Promise<Review> {
    return this.http.get<Review>(`${environment.apiUrl}/movies/${movieId}/reviews/${id}`).toPromise();
  }

  public async update(movieId: String, id: string, review: NewReview): Promise<void> {
    await this.http.put(`${environment.apiUrl}/movies/${movieId}/reviews/${id}`, review, { responseType: 'text' }).toPromise();
    this.reviewChange.next();
  }

  public async delete(movieId: String, id: string): Promise<void> {
    await this.http.delete(`${environment.apiUrl}/movies/${movieId}/reviews/${id}`, { responseType: 'text' }).toPromise();
    this.reviewChange.next();
  }


}

export type NewReview = {
  header: string;
  description: string;
  rating: number;
};

export type Review = {
  id: string;
  description: string;
  rating: number;
  authorId: string;
};
