import { Injectable } from '@angular/core';
import { Token } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: Token;
  userEmail: string;
  constructor() { }
  setToken(token: Token) {
    this.token = token;
    window.localStorage.setItem('_Token', JSON.stringify(token));
  }
  getToken() {
    if (this.token) {
      return this.token;
    } else {
      this.token = JSON.parse(window.localStorage.getItem('_Token'));
    }
    return this.token;
  }

  setUser(email: string) {
    this.userEmail = email;
    window.localStorage.setItem('_Email', JSON.stringify(email));
  }

  getUser() {
    if (this.userEmail) {
      return this.userEmail;
    } else {
      this.userEmail = JSON.parse(window.localStorage.getItem('_Email'));
    }
    return this.userEmail;
  }
}
