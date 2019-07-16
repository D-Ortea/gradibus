import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { TutorialComponent } from '../tutorial/tutorial.component';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {

  modeSelected = 'play';

  constructor(
    private router: RouterOutlet,
    private route: ActivatedRoute) { }

  ngOnInit() { }

  onActivate(event) {
    this.modeSelected = this.parseEvent(event);
  }

  private parseEvent(event) {
    return event instanceof PlayerComponent ? 'play'
      : event instanceof TutorialComponent ? 'tutorial'
        : 'test';
  }

}
