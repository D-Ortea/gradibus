import { Injectable } from '@angular/core';
import { Algorithm } from '../algorithms/algorithm';

@Injectable({
  providedIn: 'root'
})
export class ExecutionContextService {

  algorithm: Algorithm;

  constructor() { }

  setUpContext(algorithm: Algorithm, options: 
    { autoplay: boolean, skip: boolean, delete: boolean }) {      
      
    this.algorithm = algorithm;
    const gen = this.algorithm.solve();
    console.log(gen.next());
    console.log(gen.next());
  }
}
