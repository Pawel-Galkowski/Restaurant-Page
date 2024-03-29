import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';

import { switchMap } from 'rxjs/operators';

import { visibility, flyInOut, expand } from '../../animations/app.animation';
import { GlobalConstants } from '../../common/global-constants';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';
import { Comment } from '../../shared/Comment';

type ErrorObjectTypes = 'author' | 'comment';
type ErrorSugesstions = 'required' | 'minlength' | 'maxlength';

interface ValidationTypes {
  author: Record<ErrorSugesstions, string>;
  comment: Record<ErrorSugesstions, string>;
}

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    '[@expand]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), visibility(), expand()],
})
export class DishdetailComponent implements OnInit, AfterContentChecked {
  constructor(
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    @Inject('imageUrl') public imageUrl: string
  ) {
    this.createForm();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  @ViewChild('fform')
  value: number = 5;
  rate: number = 5;
  errMess?: string;
  commentFormDirective!: { resetForm: () => void };
  icons = GlobalConstants.fortawesome;
  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;
  commentForm = new FormGroup({
    author: new FormControl(),
    rating: new FormControl(),
    comment: new FormControl(),
  });
  comment: any = new Comment();

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe({
      next: (dishIds: string[]) => (this.dishIds = dishIds),
      error: (errmess: any) => (this.errMess = errmess),
    });
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.dishservice.getDish((+params['id']).toString())
        )
      )
      .subscribe({
        next: (dish: Dish) => {
          this.dish = dish;
          this.setPrevNext(dish['id']);
        },
        error: (errmess: any) => {
          this.errMess = errmess;
          this.router.navigate(['/not-found']);
        },
      });
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      rating: this.value,
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(400),
        ],
      ],
    });

    this.commentForm.valueChanges.subscribe(() => this.onValueChanged);

    this.onValueChanged();
  }

  formErrors: Record<ErrorObjectTypes, string> = {
    author: '',
    comment: '',
  };

  validationMessages: ValidationTypes = {
    author: {
      required: 'Author is required.',
      minlength: 'Author must be at least 2 characters long.',
      maxlength: 'Author cannot be more than 20 characters long.',
    },
    comment: {
      required: 'Comment is required.',
      minlength: 'Comment must contain at least 5 characters',
      maxlength: 'Comment cannot be more than 400 characters long.',
    },
  };

  onValueChanged() {
    if (!this.commentForm) return;
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field as ErrorObjectTypes] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as ErrorObjectTypes];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field as ErrorObjectTypes] +=
                messages[key as ErrorSugesstions] + ' ';
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
      comment: '',
    });

    this.comment.date = new Date().toISOString();
    this.dishservice.putDish(this.comment, this.dish.id).subscribe({
      error: (errmess) => {
        this.errMess = <any>errmess;
      },
    });

    this.dishservice.getDish(this.dish.id).subscribe({
      next: (dish) => {
        this.dish = dish;
        location.reload();
      },
      error: (errmess) => (this.errMess = <any>errmess),
    });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);

    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
