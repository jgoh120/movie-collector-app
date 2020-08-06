import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly LOCAL_STORAGE_KEY_USER = 'user_data';
  private readonly LOCAL_STORAGE_KEY_TOKEN = 'token';
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  
  constructor(
    private http: HttpClient
  ) {
    const currentUser = this.loadSessionFromStorage().user;
    this.currentUserSubject = new BehaviorSubject(currentUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private loadSessionFromStorage(): Session {
    const userStr = localStorage.getItem(this.LOCAL_STORAGE_KEY_USER);
    const token = localStorage.getItem(this.LOCAL_STORAGE_KEY_TOKEN);

    return {
      user: JSON.parse(userStr),
      token
    };
  }

  private saveSessionToStorage(user: User, token: string) {
    const userStr = JSON.stringify(user);
    localStorage.setItem(this.LOCAL_STORAGE_KEY_USER, userStr);
    localStorage.setItem(this.LOCAL_STORAGE_KEY_TOKEN, token);
  }

  private clearSessionFromStorage() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY_USER);
    localStorage.removeItem(this.LOCAL_STORAGE_KEY_TOKEN);
  }
  
  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  public getToken(): string {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY_TOKEN);
  }
  
  public login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, { username, password })
      .pipe(tap(response => {
        if (response.status === 'ok') {
          this.saveSessionToStorage(response.user, response.token);
          this.currentUserSubject.next(response.user);
        }
      }));
  }
  
  public logout() {
    this.clearSessionFromStorage();
    this.currentUserSubject.next(undefined);
  }
}

type Session = {
  user: User;
  token: string;
}

type LoginResponse = {
  status: string;
  token: string;
  user: User;
};
