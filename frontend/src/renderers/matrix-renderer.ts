import { Renderer } from './renderer';

export class MatrixRenderer implements Renderer {
  matrix: any[];

  constructor() { }

  initialize(matrix) {
    // this.renderArea
    this.matrix = matrix;
    this.render();
  }

  render() {
  }
}