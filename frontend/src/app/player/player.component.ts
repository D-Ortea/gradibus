import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlgorithmService } from '../algorithm.service';
import { ExecutionContextService } from '../execution-context.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  algorithmInput;

  speed: number;
  step: number;
  maxStep: number;
  paused: boolean;

  constructor(
    private route: ActivatedRoute,
    private algoService: AlgorithmService,
    private context: ExecutionContextService
  ) {
    this.speed = 50;
    this.step = 0;
    this.maxStep = 100;
    this.paused = true;
   }

  ngOnInit() {
    const algoName = this.route.snapshot.paramMap.get('algo');
    this.algorithmInput = this.algoService.getAlgorithm(algoName).component;
  }

  ngAfterViewInit() {
    this.context.getSteps().subscribe(steps => {
      this.step = steps;
      this.paused = this.step === 0;
    });
    this.context.getMaxSteps().subscribe(max => this.maxStep = max);
  }

  showSolution() {
    console.log('solution');
  }

  play() {
    this.paused = false;
    this.context.setSpeed(this.speed);

    this.context.play().then(solution => {
      if (solution) {
        console.log(`The solution was ${solution}`);
        this.paused = true;
        this.context.restart();
      }
    });
  }

  pause() {
    this.context.pause();
    this.paused = true;
  }

  changeSpeed() {
    if (!this.paused) { this.context.setSpeed(this.speed); }
  }

  changeStep() {
    this.pause();
    this.context.changeStep(this.step);
  }

  nextStep() {
    if (this.step < this.maxStep) { this.step++; }
    this.changeStep();
  }

  previousStep() {
    if (this.step !== 0) { this.step--; }
    this.changeStep();
  }
}
///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////
