import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post<Feedback>(BaseURL + "feedback", data)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
