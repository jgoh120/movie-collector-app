import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, isEmpty } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from './models/user';
import { ActivatedRoute } from '@angular/router';

const apiUrl = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        console.log(username + " & " + password)
        return this.http.post<any>(`${apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                console.log(user)
                if(!(Object.keys(user).length === 0 && user.constructor === Object)){    
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;    
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        const returnUrl = this.route.snapshot.queryParams['/'] || '/movies';
        window.location.href = returnUrl;
    }
}
