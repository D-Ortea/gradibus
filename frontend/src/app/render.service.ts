import { Injectable } from '@angular/core';
import { Algorithm } from '../algorithms/algorithm';
import { Subject, Observable } from 'rxjs';
import { Renderer } from 'src/app/renderers/renderer';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  algorithmSubject = new Subject<any>();
  modeSubject = new Subject<string>();

  constructor() { }

  sendAlgorithm(algorithm: Algorithm) {
    this.algorithmSubject.next(algorithm);
  }

  subscribeAlgorithm(): Observable<Algorithm> {
    return this.algorithmSubject.asObservable();
  }

  sendMode(mode: string) {
    this.modeSubject.next(mode);
  }

  subscribeMode(): Observable<string> {
    return this.modeSubject.asObservable();
  }


}
