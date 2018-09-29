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
      console.log('run time');
      return this.token;
    } else {
      console.log('local storage');
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
      console.log('run time');
      return this.userEmail;
    } else {
      console.log('local storage');
      this.userEmail = JSON.parse(window.localStorage.getItem('_Email'));
    }
    return this.userEmail;
  }
}
