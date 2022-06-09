import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingSpinner } from '../animations/app.animation';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    '[@expand]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform')

  feedbackFormDirective!: { resetForm: () => void; };
  feedbackForm!: FormGroup;
  feedback: Feedback = new Feedback;
  contactType = ContactType;
  loadingSpinner = new LoadingSpinner()
  isFeedback: boolean = false

  isContactAvailable() {
    if(this.feedback.agree) 
      return 'Yes'
    else return 'No'
  }

  formErrors: any = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: ''
  };

  validationMessages: any = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.'
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.'
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.'
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  showFeedback(){
    this.loadingSpinner.finish()
    this.isFeedback = true
    setTimeout(() => this.isFeedback = false, 5000)
  }

  onSubmit() {
    this.loadingSpinner.start()
    this.feedback = this.feedbackForm.value;
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    setTimeout(() =>  this.showFeedback(), 5000)
    this.feedbackFormDirective.resetForm()
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
}
