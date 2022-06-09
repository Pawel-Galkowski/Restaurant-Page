import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(BaseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getPromotion(id: string): Observable<Promotion[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.filter(promo => promo.id === id)[0]))
      .pipe(catchError(error => error))
  }

  getFeaturedPromotion(): Observable<Promotion[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.filter(promo => promo.featured)[0]))
      .pipe(catchError(error => error))
  }
}
