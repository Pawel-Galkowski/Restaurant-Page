import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FeedbackService } from '../../services/feedback.service';
import { ContactType, Feedback } from '../../shared/feedback';
import { flyInOut, expand } from '../../animations/app.animation';

type FormTypesLabels = 'firstname' | 'lastname' | 'telnum' | 'email';
type ErrorTypeSugesstions =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'pattern'
  | 'email';

interface ValidationTypes {
  required: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;
  email?: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    '[@expand]': 'true',
  },
  animations: [flyInOut(), expand()],
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder, private feedback: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {}

  @ViewChild('fform')
  lat = 22.333823;
  lng = 114.218278;
  feedbackForm!: FormGroup;
  contactType: ContactType = 'None';
  feedbackData?: Feedback;
  isLoading: boolean = false;
  isFeedback: boolean = false;

  showFeedback() {
    this.isLoading = false;
    this.isFeedback = true;
    setTimeout(() => (this.isFeedback = false), 5000);
  }

  validationMessages: Record<FormTypesLabels, ValidationTypes> = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.',
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
  };

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: '',
    });

    this.feedbackForm.valueChanges.subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }

  formErrors: Record<FormTypesLabels, string> = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
  };

  onSubmit() {
    this.isLoading = true;
    this.feedback.submitFeedback(this.feedbackForm.value).subscribe((data) => {
      (this.feedbackData = data), setTimeout(() => this.showFeedback(), 5000);
    });
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'None',
      message: '',
    });
  }

  onValueChanged() {
    if (!this.feedbackForm) return;
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field as FormTypesLabels] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as FormTypesLabels];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field as FormTypesLabels] +=
                messages[key as ErrorTypeSugesstions] + ' ';
            }
          }
        }
      }
    }
  }
}
