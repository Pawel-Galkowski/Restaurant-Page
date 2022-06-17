import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-top-app',
  templateUrl: './top-app.component.html',
  styleUrls: ['./top-app.component.scss']
})
export class TopAppComponent implements OnInit {

  constructor(
    @Inject('imageUrl') public imageUrl: string
  ) { }

  ngOnInit(): void {
  }

}
