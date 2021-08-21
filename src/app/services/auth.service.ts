import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  readonly url = `${environment.apiUrl}/persona/login`;

  login(users: Login) {
    let url = `${this.url}`;
    return this.httpClient
      .post<Login>(url, users)
      .pipe(map(
        data => data,
        err => console.log('Errrrrrrrrrr\n', err)));
  }
  setUser(user: Login): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }
  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }
  getToken() {
    return localStorage.getItem('accessToken');
  }
  async getCurrentUser() {
    let user_string = await localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  async logoutUser() {
    let token = await this.getToken();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return true;
    //const urlapi = '';
    //return this.httpClient.post(urlapi, accessToken);
  }
}