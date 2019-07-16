import { Model } from './model';

export class ModelContainer {
  models: [string, Model][];

  constructor(...tuples: [string, Model][]) {
    this.models = tuples;
  }

  find(key: string): Model {
    return this.models.find(([k, v]) => k === key)[1];
  }

  insert(tuple: [string, Model]) {
    this.models.push(tuple);
  }

  copyAll(data?: any[]): any[] {
    const copy: any[] = [];
    for (let i = 0; i < this.models.length; i++) {
      const [key, model] = this.models[i];
      copy.push(model.getCopy(data && data[i]));
    }
    return copy;
  }

  renderAll(animationSpeed: number, options?: {}) {
    for (const [_, model] of this.models) {
      model.renderer.render(model.getData(), animationSpeed);
    }
  }

  resetAll() {
    for (const [_, model] of this.models) { model.reset(); }
  }

  setData(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      if (!this.models[i]) { continue; }
      this.models[i][1].setData(data[i]);
    }
  }

  appendRenderArea(elem: HTMLElement) {
    for (const [_, model] of this.models) {
      elem.append(model.renderer.renderElement);
    }
  }

  public [Symbol.iterator]() {
    return this.iterator();
  }

  *iterator() {
    let counter = 0;
    while (counter < this.models.length) {
      yield this.models[counter++];
    }
  }
}
