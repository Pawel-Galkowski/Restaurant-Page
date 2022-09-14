import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../../shared/leader';
import { LeaderService } from '../../services/leader.service';
import { flyInOut, expand } from '../../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    '[@expand]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class AboutComponent implements OnInit {
  constructor(
    @Inject('imageUrl') public imageUrl: string,
    private leaderService: LeaderService
  ) {}
  leaders!: Leader[];

  ngOnInit(): void {
    this.leaderService
      .getLeaders()
      .subscribe((leaders: Leader[]) => (this.leaders = leaders));
  }
}
