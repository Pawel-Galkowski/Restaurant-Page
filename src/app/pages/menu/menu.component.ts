import { Component, OnInit, Inject } from '@angular/core'

import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service'
import { flyInOut, expand } from '../../animations/app.animation'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    '[@expand]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  constructor(
    private dishService: DishService,
    @Inject('imageUrl') public BaseURL: string
  ) { }

  dishes: any
  selectedDish: Dish | any;
  errMess?: string;

  async ngOnInit() {
    this.dishService.getDishes().subscribe({
      next: dishes => this.dishes = dishes,
      error: errmess => this.errMess = <any>errmess
    })
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
