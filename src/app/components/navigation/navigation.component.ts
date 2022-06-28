import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GlobalConstants } from '../../common/global-constants';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class HeaderComponent implements OnInit {
  icons = GlobalConstants.fortawesome;

  constructor(
    public dialog: MatDialog,
    @Inject('imageUrl') public imageUrl: string
  ) {}

  ngOnInit() {}

  openLoginForm() {
    this.dialog.open(LoginComponent, { width: '500px', height: '350px' });
  }
}
