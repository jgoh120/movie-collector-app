import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class MovieService {

  private moviesChange: BehaviorSubject<void>;
  
  constructor(
    private http: HttpClient
  ) {
    this.moviesChange = new BehaviorSubject(null);
  }

  public getAll(): Observable<Movie[]> {
    return this.moviesChange.asObservable().pipe(
      mergeMap(() => this.http.get<Movie[]>(`${environment.apiUrl}/movies`))
    );
  }

  public async create(movie: NewMovie): Promise<void> {
    await this.http.post(`${environment.apiUrl}/movies`, movie,  { responseType: 'text' }).toPromise(); 
    this.moviesChange.next();
  }

  public getById(id: string): Promise<Movie> {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`).toPromise();
  }

  public async update(id: string, movie: NewMovie): Promise<void> {
    await this.http.put(`${environment.apiUrl}/movies/${id}`, movie, { responseType: 'text' }).toPromise();
    this.moviesChange.next();
  }

  public async delete(id: string): Promise<void> {
    await this.http.delete(`${environment.apiUrl}/movies/${id}`, { responseType: 'text' }).toPromise();
    this.moviesChange.next();
  }

  public getStatisticsById(id: string): Observable<MovieStatistics> {
    return this.http.get<MovieStatistics>(`${environment.apiUrl}/movies/${id}/stats`);
  }

}

export type NewMovie = {
  title: string;
  genre: string[];
  posterUrl: string;
};

export type Movie = {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  posterUrl: string;
  contributorId: string;
};

export type MovieRatingStatistics = {
  count: number;
  distribution: number[];
  average: number;
};

export type MovieStatistics = {
  movieId: string;
  rating: MovieRatingStatistics;
};
