import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { TutorialComponent } from '../tutorial/tutorial.component';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {

  modeSelected = 'play';
  sideMenuOpened = false;

  constructor(
    private router: Router,
    private routerOutlet: RouterOutlet,
    private route: ActivatedRoute) { }

  ngOnInit() { }

  onActivate(event) {
    this.modeSelected = this.parseEvent(event);
  }

  changeAlgo(algoName: string) {
    this.router.navigateByUrl(`algorithms/${algoName}/${this.modeSelected}`);
  }

  private parseEvent(event) {
    return event instanceof PlayerComponent ? 'play'
      : event instanceof TutorialComponent ? 'tutorial'
        : 'test';
  }

  private openSideMenu(btn: HTMLDivElement) {
    btn.classList.toggle('open');
    this.sideMenuOpened = !this.sideMenuOpened;
  }

  private hideSideMenu(btn: HTMLDivElement) {
    if (this.sideMenuOpened) { this.openSideMenu(btn); }
  }


}
