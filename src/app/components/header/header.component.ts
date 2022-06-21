import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { GlobalConstants } from '../../common/global-constants';
import { LoginComponent } from '../login/login.component';
import { imageUrl } from '../../shared/baseurl'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  icons = GlobalConstants.fortawesome
  
  constructor(
    public dialog: MatDialog,
    @Inject('imageUrl') public imageUrl: string) { }

  ngOnInit() {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

}
