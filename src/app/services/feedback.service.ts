import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  submitFeedback(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.http.post<Feedback>(BaseURL + "feedback", data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
