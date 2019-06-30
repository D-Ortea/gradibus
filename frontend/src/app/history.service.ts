import { Injectable } from '@angular/core';
import { RendererContainer } from './renderers/renderer-container';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private algorithmSteps: any[] = [];
  private lastContainer: RendererContainer;
  constructor() { }

  addStep(rendererContainer: RendererContainer) {
    if (rendererContainer !== this.lastContainer) { 
      this.lastContainer = rendererContainer; 
    }
    console.log(rendererContainer.copyAll());
    this.algorithmSteps.push(rendererContainer.copyAll());
  }

  getStep(index: number): any[] {
    console.log(`Index required: ${index}/${this.algorithmSteps.length}`);
    console.log(this.algorithmSteps[index]);
    return this.lastContainer.copyAll(this.algorithmSteps[index]);
  }

  getTotalSteps(): number {
    return this.algorithmSteps.length - 1;
  }

  clear() {
    this.algorithmSteps = [];
    this.lastContainer = undefined;
  }

  printHistory() {
    this.algorithmSteps.forEach(step => console.log(step));
  }
}
