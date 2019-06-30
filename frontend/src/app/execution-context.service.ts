import { Injectable } from '@angular/core';
import { Algorithm } from '../algorithms/algorithm';
import { Options } from './Options';
import { Subject, Observable } from 'rxjs';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionContextService {
  private solve: Function;
  private algorithm: Algorithm;
  private stepSubject = new Subject<number>();
  private maxStepSubject = new Subject<number>();

  stepsExecuted = 0;
  timeDelay = 0;
  totalSteps = 0;
  stopPoint: number;
  oldSpeed: number;

  constructor(private history: HistoryService) { }

  setUpContext(algorithm: Algorithm, options: Options) {
    algorithm.player = this;
    this.algorithm = algorithm;
    this.noRender()
    this.reset();
    this.solve = this.makeSingle(algorithm, algorithm.solve);
    
    return this.calculateStepsAndShow();
  }

  noRender(value = true) {
    this.algorithm.rendererContainer.noRender(value);
  }

  reset() {
    if (this.solve) { this.solve(true); }
    this.history.clear();
    this.pause();
    this.stopPoint = undefined;
    this.totalSteps = 0
    this.restart();
    this.sendStep();
  }

  setSpeed(speed: number) {
    this.timeDelay = speed;
  }

  isPaused() {
    return this.timeDelay == Number.MAX_VALUE;
  }

  pause() {
    this.setSpeed(Number.MAX_VALUE);
  }

  isPrevious(stopPoint: number) {
    return stopPoint < this.stepsExecuted;
  }

  async delay() {    
    this.stepsExecuted++;
    if (this.algorithm.rendererContainer.isRendering()) { 
      this.sendStep();
    } else if (!this.stopPoint) {
      this.history.addStep(this.algorithm.rendererContainer);
    }

    if (this.stopPoint && this.stopPoint === this.stepsExecuted) { 
      this.stopPoint = undefined;
      this.noRender(false);
      this.setSpeed(this.oldSpeed);
    }
    
    const start = new Date().getTime();

    while(new Date().getTime() - start < this.timeDelay) {
      console.log('sleeping just one ms...zzzzz');
      await this.sleep(1);
    }    
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async play() {
    if (this.stopPoint) { return this.playUntilStopPoint(); }
    if (this.stepsExecuted > 0) { return; }

    return await this.solve();
  }

  async calculateStepsAndShow() {
    this.setSpeed(0);

    const solution = await this.solve();

    this.totalSteps = this.stepsExecuted;
    this.sendMaxStep();
    this.noRender(false);
    this.restart();
    
    this.algorithm.rendererContainer.resetAll();
    this.algorithm.rendererContainer.renderAll();
    return solution;
  }

  async playUntilStopPoint() {
    this.oldSpeed = this.timeDelay;
    this.setSpeed(0);
    this.noRender();

    return await this.solve();
  }

  restart() {
    this.stepsExecuted = 0;
  }

  changeStep(step: number) {
    this.algorithm.rendererContainer.setData(this.history.getStep(step));
    this.algorithm.rendererContainer.renderAll();
    this.restart();
    this.stopPoint = step;
  }

  makeSingle(context: Algorithm, generator: Function) {
    let globalNonce;
    return async function(end: boolean = false) {
      const localNonce = globalNonce = new Object();
      if (end) { return; }
      const iter = generator.call(context);
      let resumeValue;
      for (;;) {
        const n = iter.next(resumeValue);

        if (n.done) { return n.value; }

        resumeValue = await n.value;
        if (localNonce !== globalNonce) { return; }
      }
    }
  }

  sendStep() {
    this.stepSubject.next(this.stepsExecuted);
  }

  getSteps(): Observable<number> {
    return this.stepSubject.asObservable();
  }

  sendMaxStep() {
    this.maxStepSubject.next(this.totalSteps);
  }

  getMaxSteps() {
    return this.maxStepSubject.asObservable();
  }
}