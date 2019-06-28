import { Injectable } from '@angular/core';
import { Algorithm } from '../algorithms/algorithm';
import { Subject, Observable } from 'rxjs';
import { Renderer } from 'src/app/render-components/renderer';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  
  algorithmSubject = new Subject<any>();
  rendererSubject = new Subject<any>();
  
  constructor() { }
  
  sendAlgorithm(algorithm: Algorithm) {
    this.algorithmSubject.next(algorithm);
  }
  
  getAlgorithm(): Observable<Algorithm> {
    return this.algorithmSubject.asObservable();
  }

  sendRenderer(renderer: Renderer) {
    this.rendererSubject.next(renderer);
  }

  getRenderer(): Observable<Renderer> {
    return this.rendererSubject.asObservable();
  }
}
