import { Component, OnInit, Inject } from '@angular/core'
import { Leader } from '../shared/leader'
import { LeaderService } from '../services/leader.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    @Inject('BaseURL') public BaseURL: string,
    private leaderService: LeaderService
  ) { }

  leader: Leader = new Leader
  leaders!: Leader[]

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe((leaders: Leader[]) => this.leaders = leaders)
  }
}
