import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AlgorithmService } from '../algorithm.service';
import { ExecutionContextService } from '../execution-context.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  algorithmInput;

  speed: number = 50;
  step: number;
  maxStep: number = 100;

  constructor(
    private route: ActivatedRoute,
    private algoService: AlgorithmService,
    private context: ExecutionContextService
  ) { }

  ngOnInit() {
    const algoName = this.route.snapshot.paramMap.get('algo');    
    this.algorithmInput = this.algoService.getAlgorithm(algoName).component;
  }

  ngAfterViewInit() {
    this.context.getContext().subscribe(stepInfo => {
      if (stepInfo.includes('Total')) {
        this.maxStep = +stepInfo.split(' ')[1];
      } else {
        this.step = +stepInfo;
      }
    });
  }

  showSolution() {
    console.log('solution');
  }

  play(stopPoint?: number) {
    this.context.play(stopPoint).then(solution => {
      if (solution) { console.log(`The solution was ${solution}`); }
    });
  }

  playClick() {
    this.context.setSpeed(this.speed);
    this.play();
  }

  pauseClick() {
    this.context.pause();
  }

  changeSpeed() {
    if(!this.context.isPaused()) { this.context.setSpeed(this.speed); };
  }

  changeStep() {
    this.play(this.step);
  }

  nextStep() {
    if (this.step < this.maxStep) { this.step++; }
    this.changeStep();
  }

  previousStep() {
    if (this.step != 0) { this.step--; }
    this.changeStep();
  }
}
///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////