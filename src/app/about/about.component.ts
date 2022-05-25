import { Component, OnInit } from '@angular/core';
import { Leaders } from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  leaders = Leaders

  ngOnInit(): void {
  }

}
