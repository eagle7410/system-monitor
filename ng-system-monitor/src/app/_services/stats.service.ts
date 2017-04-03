import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import suff from '../_helpers/url/suff';

import {AuthenticationService} from './authentication.service';
import {DateRange} from '../_models/date-range';

@Injectable()
export class StatsService {
  private _authHead : RequestOptions;
  
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
      
    let headers = new Headers();
    headers.append('token', this.authenticationService.token);
    this._authHead = new RequestOptions({headers: headers});
  }
  
  stats(data:DateRange): Observable<any[]> {
    return this.http.get(`/${suff}stats/${data.from}/${data.to}`, this._authHead)
      .map((response: Response) => response.json().stats);
    
  }
  
}
