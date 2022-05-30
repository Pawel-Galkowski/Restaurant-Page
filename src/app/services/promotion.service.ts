import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => of(resolve(PROMOTIONS)).pipe(delay(2000)))
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise(resolve => of(resolve(PROMOTIONS.filter(promo => promo.id === id)[0])).pipe(delay(2000)))
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => of(resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0])).pipe(delay(2000)))
  }
}
