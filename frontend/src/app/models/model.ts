import { Renderer } from '../renderers/renderer';

export interface Model {
  renderer: Renderer;

  initialize(data: any): void;
  reset(): void;
  getData(): any;
  setData(data: any): void;
  getCopy(data?: any): any;
}
