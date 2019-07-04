import { Injectable } from '@angular/core';
import { Algorithm } from '../algorithms/algorithm';
import { Options } from './Options';
import { Subject, Observable } from 'rxjs';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionContextService {
  private stepSubject = new Subject<number>();
  private maxStepSubject = new Subject<number>();

  private algorithm: Algorithm;
  private timeDelay = 1000;
  private uniquePlay: (end?: boolean) => Promise<any>;

  stepsExecuted = 0;
  isPaused: boolean;
  solution: any;

  constructor(private history: HistoryService) {
    this.uniquePlay = this.makeSingle(this, this.playCycle);
  }

  setUpContext(algorithm: Algorithm, options: Options) {
    this.linkAlgorithm(algorithm);
    this.reset();

    this.solution = algorithm.solve();

    this.stepsExecuted = 0;
    this.notifyTotalSteps();
    this.renderStep(0);

    if (options.autoplay) { setTimeout(() => this.play(), 0); }

    if (options.skip) {
      this.changeStep(this.history.getMaxStep());
      setTimeout(() => this.notifyStepChange(this.history.getMaxStep()), 0);
    }
  }

  private linkAlgorithm(algorithm: Algorithm) {
    algorithm.player = this;
    this.algorithm = algorithm;
  }

  private reset() {
    this.history.clear();
    this.pause();
    this.stepsExecuted = 0;
    this.notifyStepChange();
  }

  setSpeed(speed: number) {
    this.timeDelay = speed;
  }

  pause() {
    this.isPaused = true;
  }

  delay() {
    this.history.addStep(this.algorithm.modelContainer);
    this.stepsExecuted++;
  }

  private async sleep() {
    const time = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    const start = new Date().getTime();

    while (new Date().getTime() - start < this.timeDelay || this.isPaused) {
      await time(1);
    }
  }

  play(): Promise<any> {
    this.isPaused = false;
    return this.uniquePlay();
  }

  private *playCycle() {
    while (this.stepsExecuted <= this.history.getMaxStep()) {
      this.notifyStepChange();
      this.renderStep(this.stepsExecuted++);
      yield this.sleep();
    }

    this.pause();
    this.stepsExecuted = 0;
    return this.solution;
  }

  changeStep(step: number) {
    this.pause();
    this.uniquePlay(true);
    this.stepsExecuted = step === this.history.getMaxStep() ? 0 : step;
    this.renderStep(step);
  }

  private renderStep(step: number) {
    this.algorithm.modelContainer.setData(this.history.getStep(step));
    this.algorithm.modelContainer.renderAll(this.timeDelay);
  }

  notifyStepChange(step?: number) {
    this.stepSubject.next(step || this.stepsExecuted);
  }

  subscribeSteps(): Observable<number> {
    return this.stepSubject.asObservable();
  }

  notifyTotalSteps() {
    this.maxStepSubject.next(this.history.getMaxStep());
  }

  subscribeTotalSteps() {
    return this.maxStepSubject.asObservable();
  }

  private makeSingle(context: ExecutionContextService, generator: () => any) {
    let globalNonce;
    return async (end: boolean = false) => {
      const localNonce = globalNonce = new Object();
      if (end) { return; }
      const iter = generator.call(context);
      let resumeValue;
      for (; ;) {
        const n = iter.next(resumeValue);

        if (n.done) { return n.value; }

        resumeValue = await n.value;
        if (localNonce !== globalNonce) { return; }
      }
    };
  }
}
