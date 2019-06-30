import { Injectable } from '@angular/core';
import { RendererContainer } from './render-components/renderer-container';

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
    
    this.algorithmSteps.push(rendererContainer.copyAll());
  }

  getStep(index: number): any[] {
    console.log(`Index required: ${index}/${this.algorithmSteps.length}`);
    return this.lastContainer.copyAll(this.algorithmSteps[index]);
  }

  clear() {
    this.algorithmSteps = [];
    this.lastContainer = undefined;
  }

  printHistory() {
    this.algorithmSteps.forEach(step => console.log(step));
  }
}
