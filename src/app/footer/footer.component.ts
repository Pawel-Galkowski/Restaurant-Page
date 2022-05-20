import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  icons = GlobalConstants.fortawesome

  constructor() {}

  ngOnInit(): void {
  }
}
