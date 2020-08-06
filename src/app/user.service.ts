import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  constructor(
    private http: HttpClient
  ) { }
  
  register(user: UserRegistration): Observable<string> {
    return this.http.post(`${environment.apiUrl}/users/register`, user,  {
      responseType: 'text'
    }); 
  }

  update(user: UserRegistration): Observable<string> {
    return this.http.put(`${environment.apiUrl}/users`, user,  {
      responseType: 'text'
    }); 
  }
  
}

export type UserRegistration = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
}

export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
}
