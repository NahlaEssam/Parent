import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Token, UserList, UserDetails, User } from '../../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  // TODO: check proxy problem
  // "ng": "ng --proxy-config proxy.conf.json",
  // "start": "ng serve --proxy-config proxy.conf.json",
  BaseUrl = 'https://reqres.in/api';
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<Token> {
    const userInfo = {
      'email': username,
      'password': password
    };

    // return this.http.post<Token>(`${this.BaseUrl}/login`, userInfo).pipe(
    //   tap((token: Token) => console.log(`added hero w/ id=${token}`)),
    //   catchError(this.handleError<Token>('addUser'))
    // );
    return this.http.post<Token>(`${this.BaseUrl}/login`, userInfo);

  }

  getUserLists(page: number): Observable<UserList> {

    const url = `${this.BaseUrl}/users/?page=${page}`;
    // return this.http.get<UserList>(url).pipe(
    //   tap(_ => console.log(`fetched hero id=${page}`)),
    //   catchError(this.handleError<UserList>(`getHero id=${page}`))
    // );
    return this.http.get<UserList>(url);
  }
  getUser(userId: number): Observable<UserDetails> {

    const url = `${this.BaseUrl}/users/${userId}`;
    // return this.http.get<UserDetails>(url).pipe(
    //   tap(_ => console.log(`fetched hero id=${userId}`)),
    //   catchError(this.handleError<UserDetails>(`getHero id=${userId}`))
    // );
    return this.http.get<UserDetails>(url);
  }

  createUser(name: string, job: string): Observable<UserDetails> {
    const userInfo = {
      'name': name,
      'job': job
    };

    // return this.http.post<User>(`${this.BaseUrl}/users`, userInfo).pipe(
    //   tap((userDetails: UserDetails) => console.log(`added hero w/ id=${userDetails}`)),
    //   catchError(this.handleError<UserDetails>('addUser'))
    // );
    return this.http.post<UserDetails>(`${this.BaseUrl}/users`, userInfo);

  }

  deleteUser(userId: number): Observable<any> {
    // return this.http.delete(`${this.BaseUrl}/users/${userId}`).pipe(
    //   tap(_ => console.log(`deleted hero id=${userId}`)),
    //   catchError(this.handleError('deleteHero'))
    // );
    return this.http.delete(`${this.BaseUrl}/users/${userId}`);
  }

  updateUser(userId: string, name: string, job: string): Observable<any> {
    const updatedUser: User = {
      name: name,
      job: job
    };
    // return this.http.put(`${this.BaseUrl}/users/${user.id}`, updatedUser, httpOptions).pipe(
    //   tap(_ => console.log(`updated hero id=${user.id}`)),
    //   catchError(this.handleError<any>('updateHero'))
    // );
    return this.http.put(`${this.BaseUrl}/users/${userId}`, updatedUser, httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // TODO : need to have message service to show the error messages generally
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
