import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class MovieService {
  
  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Promise<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`).toPromise();
  }

  public create(movie: NewMovie): Promise<string>{
    return this.http.post(`${environment.apiUrl}/movies`, movie,  { responseType: 'text' }).toPromise(); 
  }

  public getById(id: string): Promise<Movie> {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`).toPromise();
  }

  public update(id: string, movie: NewMovie): Promise<string> {
    return this.http.put(`${environment.apiUrl}/movies/${id}`, movie, { responseType: 'text' }).toPromise();
  }

  public delete(id: string): Promise<string> {
    return this.http.delete(`${environment.apiUrl}/movies/${id}`, { responseType: 'text' }).toPromise();
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
