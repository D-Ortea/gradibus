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
  isInSync = true;
  stopPoint: number;
  oldSpeed: number;

  constructor(private history: HistoryService) { }

  setUpContext(algorithm: Algorithm, options: Options) {
    algorithm.player = this;
    algorithm.renderer.noRender = true;
    this.algorithm = algorithm;
    this.solve = this.makeSingle(algorithm, algorithm.solve);
    
    return this.playWithoutRendering();
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
    if (!this.algorithm.renderer.noRender) { 
      this.sendStep(); 
    } else if (!this.stopPoint) {
      this.history.addStep(this.algorithm.renderer);
    }

    if (this.stopPoint && this.stopPoint === this.stepsExecuted) { 
      this.stopPoint = undefined;
      this.algorithm.renderer.noRender = false;
      this.setSpeed(this.oldSpeed);
    }
    
    const start = new Date().getTime();

    while(new Date().getTime() - start < this.timeDelay) {
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

  async playWithoutRendering() {
    this.setSpeed(0);

    const solution = await this.solve();

    this.totalSteps = this.stepsExecuted;
    this.sendMaxStep();
    this.algorithm.renderer.noRender = false;
    this.reset();
    
    return solution;
  }

  async playUntilStopPoint() {
    this.oldSpeed = this.timeDelay;
    this.setSpeed(0);
    this.algorithm.renderer.noRender = true;

    return await this.solve();
  }

  reset() {
    this.stepsExecuted = 0;
  }

  changeStep(step: number) {
    this.algorithm.renderer.setData(this.history.getStep(step));
    this.algorithm.renderer.render();
    this.reset();
    this.stopPoint = step;
  }

  makeSingle(context: Algorithm, generator: Function) {
    let globalNonce;
    return async function(...args) {
      const localNonce = globalNonce = new Object();

      const iter = generator.call(context,...args);
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