import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-algo-card',
  templateUrl: './algo-card.component.html',
  styleUrls: ['./algo-card.component.css']
})
export class AlgoCardComponent implements OnInit {

  @Input() algorithm;
  @Output() tagfilter = new EventEmitter();
  overlay: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  playVideo(video) {
    video.play();
    if (!this.overlay) { this.overlay = true; }
  }

  stopVideo(video) {
    video.pause();
    video.currentTime = 0;
    this.overlay = false;
  }
}
