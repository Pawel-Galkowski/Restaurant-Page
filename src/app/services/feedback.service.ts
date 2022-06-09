import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }
  isFeedback: boolean = false
  isLoading: boolean = false
  informations: Feedback = new Feedback

  startLoading() {
    this.isLoading = true
  }

  finishLoading() {
    this.isLoading = false
  }

  showFeedback(){
    this.finishLoading()
    this.isFeedback = true
    setTimeout(() => this.isFeedback = false, 5000)
  }

  createFeedback(param: any) {
    this.startLoading()
    this.informations = param
    setTimeout(() =>  this.showFeedback(), 5000)
  }

  isContactAvailable() {
    if(this.informations.agree) 
      return 'Yes'
    else return 'No'
  }
}
