import { Model } from './model';
import { Renderer } from '../renderers/renderer';
import { ElementWrapper } from './element-wrapper';
import { BarChartRenderer } from '../renderers/bar-chart-renderer';

export class BarChartModel implements Model {

  private array: ElementWrapper[];

  renderer: Renderer;

  constructor() {
    this.renderer = new BarChartRenderer();
    this.array = [];
  }

  initialize(arr: any[]): void {
    this.array = arr.map(el => new ElementWrapper(el));
  }

  reset(): void {
    this.array.forEach(el => el.reset());
  }

  getData(): ElementWrapper[] {
    return this.array;
  }

  setData(arr: ElementWrapper[]): void {
    this.array = arr;
  }

  getCopy(arr?: ElementWrapper[]) {
    const array = arr || this.array;
    return array.map(el => el.copy());
  }

  mark(i: number) {
    this.array[i].marked = true;
  }

  unMark(i: number) {
    this.array[i].marked = false;
  }

  swap(i: number, j: number) {
    this.array[i].changed = true;
    this.array[j].changed = true;
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
  }

  insert(value: any, i: number) {
    this.array.splice(i, 0, new ElementWrapper(value));
  }

  remove(i: number) {
    if (i > 0 && i < this.array.length) {
      this.array.splice(i, 1);
    }
  }
}
