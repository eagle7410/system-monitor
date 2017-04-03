import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import suff from '../_helpers/url/suff';

@Injectable()
export class AuthenticationService {
  public token: string;
  private _jsonHead :RequestOptions;
  
  constructor(private http: Http) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this._jsonHead = new RequestOptions({headers: headers});
  }
  
  login(login: string, pass: string): Observable<boolean> {
    
    return this.http.post(`/${suff}login`, JSON.stringify({login: login, pass: pass}), this._jsonHead)
      .map((response: Response) => {
        
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({login: login, token: token}));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
