import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import suff from '../_helpers/url/suff';

import {AuthenticationService} from './authentication.service';
import {User} from '../_models/user';

@Injectable()
export class UserService {
  private _jsonAuthHead : RequestOptions;
  private _authHead : RequestOptions;
  
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    let headers = new Headers();
    headers.append('token', this.authenticationService.token);
    headers.append('Content-Type', 'application/json');
    this._jsonAuthHead = new RequestOptions({headers: headers});
    
    headers = new Headers();
    headers.append('token', this.authenticationService.token);
    this._authHead = new RequestOptions({headers: headers});
  }
  
  all(): Observable<User[]> {
    return this.http.get(`/${suff}users`, this._authHead)
      .map((response: Response) => response.json().users);
    
  }
  
  remove(user: User): Observable<Boolean> {
    
    return this.http.delete(`/${suff}user/${user.login}`, this._jsonAuthHead)
      .map((response: Response) => {
        return response.json().success;
      });
    
  }
  
  create(user: User): Observable<Boolean> {
    
    return this.http.post(`/${suff}user`,user , this._jsonAuthHead)
      .map((response: Response) => {
        return response.json().success;
      });
  }
}
