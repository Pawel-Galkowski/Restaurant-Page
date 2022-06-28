import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class TopAppComponent implements OnInit {
  constructor(@Inject('imageUrl') public imageUrl: string) {}

  ngOnInit(): void {}
}
