import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { GlobalConstants } from '../../common/global-constants';
import { LoginComponent } from '../login/login.component';
import { BaseURL } from '../../shared/baseurl'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  icons = GlobalConstants.fortawesome
  url = BaseURL
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

}
