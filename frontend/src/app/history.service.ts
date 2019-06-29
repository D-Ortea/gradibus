import { Injectable } from '@angular/core';
import { Renderer } from './render-components/renderer';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private algorithmSteps: any[] = [];
  private lastRenderer: Renderer;
  constructor() { }

  addStep(renderer: Renderer) {
    if (renderer != this.lastRenderer) { this.lastRenderer = renderer; }
    this.algorithmSteps.push(renderer.getCopy());
  }

  getStep(index: number) {
    console.log(`Index required: ${index}/${this.algorithmSteps.length}`);
    return this.lastRenderer.getCopy(this.algorithmSteps[index]);
  }  

  printHistory() {
    this.algorithmSteps.forEach(step => console.log(step));
  }
}
