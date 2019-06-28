import { Renderer } from 'src/renderers/renderer';

export interface Algorithm {
  renderType: Function;
  renderer: Renderer;

  solve(): IterableIterator<string>;
}