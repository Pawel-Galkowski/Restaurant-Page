import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  icons = GlobalConstants.fortawesome
  
  constructor() { }

  ngOnInit(): void {
  }

}
