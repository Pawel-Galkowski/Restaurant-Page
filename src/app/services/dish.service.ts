import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseURL } from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  putDish(comment: Comment, id: string): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<Comment>(BaseURL + 'dishes/' + id, comment, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(BaseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(BaseURL + 'dishes' + `/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.filter((dish: Dish) => dish.featured)[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes: Dish[]) => dishes.map((dish: Dish) => dish.id)))
      .pipe(catchError((error) => error));
  }
}
