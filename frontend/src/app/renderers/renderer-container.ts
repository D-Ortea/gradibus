import { Renderer } from './renderer';

export class RendererContainer {
  renderers: [string, Renderer][];

  constructor(...tuples: [string, Renderer][]) {
    this.renderers = tuples;
  }

  find(key: string): Renderer {
    return this.renderers.find(([k, v]) => k === key)[1];
  }

  insert(tuple: [string, Renderer]) {
    this.renderers.push(tuple);
  }

  copyAll(data?: any[]): any[] {
    const copy: any[] = []
    for (let i = 0; i < this.renderers.length; i++) {
      const [key, renderer] = this.renderers[i];
      copy.push(renderer.getCopy(data && data[i]));      
    }
    return copy;
  }

  noRender(value = true) {
    for (let [_, renderer] of this.renderers) { renderer.noRender = value; }
  }

  renderAll() {
    for (let [_, renderer] of this.renderers) { renderer.render(); }
  }

  resetAll() {
    for (let [_, renderer] of this.renderers) { renderer.reset(); }
  }

  setData(data: any[]) {
    for (let i = 0; i <  data.length; i++) {
      if (!this.renderers[i]) { continue; }
      this.renderers[i][1].setData(data[i]);
    }
  }

  appendInto(elem: HTMLElement) {
    for (let [_, renderer] of this.renderers) { elem.append(renderer.renderElement); }
  }

  isRendering(): boolean {
    return !this.renderers[0][1].noRender;
  }

  public [Symbol.iterator]() {
    return this.iterator();
  }

  *iterator() {
    let counter = 0;
    while (counter < this.noRender.length) {
      yield this.renderers[counter];
    }
  }

}