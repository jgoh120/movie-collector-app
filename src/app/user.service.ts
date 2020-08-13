import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  constructor(
    private http: HttpClient
  ) { }
  
  public register(user: UserRegistration): Promise<string> {
    return this.http.post(`${environment.apiUrl}/users/register`, user,  {
      responseType: 'text'
    }).toPromise(); 
  }

  public update(user: UserRegistration): Promise<string> {
    return this.http.put(`${environment.apiUrl}/users`, user,  {
      responseType: 'text'
    }).toPromise();
  }
  
}

export type UserRegistration = {
  username: string;
  firstname: string;
  password: string;
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
