import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class MovieService {
  
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  create(movie: NewMovie): Observable<string>{
    return this.http.post(`${environment.apiUrl}/movies`, movie,  { responseType: 'text' }); 
  }

  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${environment.apiUrl}/${id}`);
  }

  update(id: string, movie: NewMovie): Observable<string> {
    return this.http.put(`${environment.apiUrl}/${id}`, movie, { responseType: 'text' });
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`${environment.apiUrl}/${id}`, { responseType: 'text' });
  }

}

type NewMovie = {
  title: string;
  genre: string[];
  rating: number;
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
