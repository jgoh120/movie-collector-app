import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './models/user';

const apiUrl = 'http://localhost:4000';

const apiUrl2 = 'http://localhost:3000/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  //public movieList:User[] = []
  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<User[]>(`${apiUrl}/users`);
  }
  
  addUser(user: User): Observable<any>{
    return this.http.post(apiUrl2, user,  {responseType: 'text'}); 
  }
  
}

export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
}
