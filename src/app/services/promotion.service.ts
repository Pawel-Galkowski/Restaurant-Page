import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { LoaderService } from './loader.service';

import { BaseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    private processHTTPMsgService: ProcessHTTPMsgService,
    private http: HttpClient
  ) {}

  url: string = BaseURL + 'promotions';

  getPromotions(): Observable<Promotion[]> {
    return this.http
      .get<Promotion[]>(this.url)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http
      .get<Promotion[]>(this.url)
      .pipe(map((promotions: Promotion[]) => promotions.filter((promo: Promotion) => promo.id === id)[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion[] | any> {
    return this.http
      .get<Promotion[]>(this.url)
      .pipe(map((promotions: Promotion[]) => promotions.filter((promo: Promotion) => promo.featured)[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
