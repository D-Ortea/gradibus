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
  private _pauseAt: number;
  private algorithm: Algorithm;
  private subject = new Subject<any>();

  stepsExecuted = 0;
  timeDelay = 0;
  totalSteps = 0;
  isInSync = true;

  constructor(private history: HistoryService) { }

  setUpContext(algorithm: Algorithm, options: Options) {
    algorithm.player = this;
    algorithm.renderer.noRender = true;
    this.algorithm = algorithm;
    this.solve = this.makeSingle(algorithm, algorithm.solve);
    this.setSpeed(0);
    return this.play();
  }

  setSpeed(speed: number) {
    this.timeDelay = speed;
  }

  isPaused() {
    return this.timeDelay == Number.MAX_VALUE;
  }

  pauseAt(step: number) {
    this._pauseAt = step;
  }  

  pause() {
    this.setSpeed(Number.MAX_VALUE);
  }

  isPrevious(stopPoint: number) {
    return stopPoint < this.stepsExecuted;
  }

  async delay() {
    
    this.stepsExecuted++;
    this.sendContext(`${this.stepsExecuted}`);

    if (this._pauseAt && this._pauseAt == this.stepsExecuted) { this.pause(); }
    
    const start = new Date().getTime();

    while(new Date().getTime() - start < this.timeDelay) {
      await this.sleep(1);
    }    
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async play(stopPoint: number = undefined) {
    if (stopPoint) { 
      this.pauseAt(stopPoint);
      this.setSpeed(0);
      if (this.isPrevious(stopPoint)) { return this.rewind(stopPoint); }
    }

    if (!this.isInSync){ 
      this.stepsExecuted = 0; 
      this.isInSync = true;
    }

    if (this.stepsExecuted > 0) { return; }

    let solution = await this.solve();
    if (solution) {
      [this.stepsExecuted, this.totalSteps] = [0 ,this.stepsExecuted];
      this.subject.next(`Total ${this.totalSteps}`);
      this.algorithm.renderer.noRender = false;
    }

    return solution;
  }

  private rewind(step: number) {
    this.algorithm.renderer.setData(this.history.getStep(this.stepsExecuted));
    this.algorithm.renderer.render();
    this.stepsExecuted = step;
    this.isInSync = false;
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

  sendContext(data: string) {
    this.subject.next(data);
  }

  getContext(): Observable<string> {
    return this.subject.asObservable();
  }
}