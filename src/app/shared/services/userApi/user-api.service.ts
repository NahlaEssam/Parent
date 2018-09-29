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

    return this.http.post<Token>(`${this.BaseUrl}/login`, userInfo);

  }

  getUserLists(page: number): Observable<UserList> {

    const url = `${this.BaseUrl}/users/?page=${page}`;
    return this.http.get<UserList>(url);
  }
  getUser(userId: number): Observable<any> {

    const url = `${this.BaseUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }

  createUser(name: string, job: string): Observable<UserDetails> {
    const userInfo = {
      'name': name,
      'job': job
    };
    return this.http.post<UserDetails>(`${this.BaseUrl}/users`, userInfo);

  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.BaseUrl}/users/${userId}`);
  }

  updateUser(userId: string, name: string, job: string): Observable<any> {
    const updatedUser: User = {
      name: name,
      job: job
    };
    return this.http.put(`${this.BaseUrl}/users/${userId}`, updatedUser, httpOptions);
  }

}
