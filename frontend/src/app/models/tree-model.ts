import { Model } from './model';
import { TreeRenderer } from '../renderers/tree-renderer';

export class TreeModel implements Model {
  private data: any;

  renderer: TreeRenderer;

  constructor() {
    this.renderer = new TreeRenderer();
  }

  initialize(data: any): void {
    this.data = data;
  }

  reset(): void {
    this.data = null;
  }

  getData(): any {
    return this.data;
  }

  setData(data: any): void {
    this.data = data;
  }

  getCopy(data?: any) {
    return data || this.data;
  }

  markEdge(source, target) {

  }

  compare(value, to) {

  }

  removeCompare() {

  }

  insertion(root, node) {

  }

  deletion(root, node) {

  }
}
