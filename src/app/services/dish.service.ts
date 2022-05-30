import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => of(resolve(DISHES)).pipe(delay(2000)));
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve => of(resolve(DISHES.filter((dish) => (dish.id === id))[0])).pipe(delay(2000)));
  }

  getFeaturedDish(): Promise<Dish> {
    return  new Promise(resolve => of(resolve(DISHES.filter((dish) => dish.featured)[0])).pipe(delay(2000)));
  }
}
