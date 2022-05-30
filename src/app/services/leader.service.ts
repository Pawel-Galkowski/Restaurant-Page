import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => of(resolve(LEADERS.filter((leader) => leader.featured)[0])).pipe(delay(2000)))
  }

  
}
