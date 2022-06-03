import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChangeDetectorRef,AfterContentChecked} from '@angular/core'

import { switchMap } from 'rxjs/operators';

import { GlobalConstants } from '../common/global-constants';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/Comment';
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit, AfterContentChecked {

    constructor(
      private changeDetector: ChangeDetectorRef,
      private fb: FormBuilder,
      private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location
    ) { }
  
    ngAfterContentChecked() : void {
      this.changeDetector.detectChanges();
    }

    @ViewChild('fform')

    value = 5
    rate = 5

    commentFormDirective!: { resetForm: () => void }
    icons = GlobalConstants.fortawesome
    dish: Dish = new Dish
    dishIds!: string[]
    prev!: string
    next!: string
    commentForm = new FormGroup({
      author: new FormControl(),
      rating: new FormControl(),
      comment: new FormControl()
    });
    comment:any = new Comment
  
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap(
        (params: Params) => this.dishservice.getDish(params['id']))).subscribe(dish => {
        this.dish = dish; 
        this.setPrevNext(dish.id); 
      });
    }

    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)] ],
        rating: [this.value, [Validators.required] ],
        comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(400)] ]
      });
  
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  
      this.onValueChanged();
    }

    formErrors:any = {
      author: '',
      rating: this.value,
      comment: ''
    };

    validationMessages: any = {
      author: {
        required: 'Author is required.',
        minlength: 'Author must be at least 2 characters long.',
        maxlength: 'Author cannot be more than 20 characters long.'
      },
      rating: {
        required: 'Rating is required.',
      },
      comment: {
        required: 'Comment is required.',
        pattern: 'Comment must contain at least 5 characters'
      }
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  
    onSubmit() {
      this.comment = this.commentForm.value;
      this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
      });

      const selectedDish = DISHES.find(dish => dish.id === this.dish.id)
      this.comment.date = Date.now()
      selectedDish?.comments?.push(this.comment)
    }
  
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);

      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
  
    goBack(): void {
      this.location.back();
    }
  }
