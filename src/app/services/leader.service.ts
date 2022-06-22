import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseURL } from '../shared/baseurl';
import { Leader } from '../shared/leader';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(BaseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader | any> {
    return this.getLeaders()
    .pipe(map(leaders => leaders.filter(leader => leader.featured)[0]))
    .pipe(catchError(error => error))
  }
}
