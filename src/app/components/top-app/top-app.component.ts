import { Component, OnInit } from '@angular/core';

import { BaseURL } from '../../shared/baseurl'

@Component({
  selector: 'app-top-app',
  templateUrl: './top-app.component.html',
  styleUrls: ['./top-app.component.scss']
})
export class TopAppComponent implements OnInit {

  constructor() { }
  url = BaseURL

  ngOnInit(): void {
  }

}
