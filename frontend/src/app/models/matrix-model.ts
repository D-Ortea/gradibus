import { Model } from './model';
import { MatrixRenderer } from '../renderers/matrix-renderer';
import { ElementWrapper } from './element-wrapper';

export class MatrixModel implements Model {

  private matrix: ElementWrapper[][];

  renderer: MatrixRenderer;

  constructor() {
    this.renderer = new MatrixRenderer();
    this.matrix = [];
  }

  initialize(array: any[]): void {
    this.matrix = array.map(row => row.map((cell: any) => new ElementWrapper(cell)));
  }

  reset(): void {
    this.matrix.forEach(row => row.forEach(cell => cell.reset()));
  }

  getData(): ElementWrapper[][] {
    return this.matrix;
  }

  setData(newMatrix: ElementWrapper[][]): void {
    this.matrix = newMatrix;
  }

  getCopy(data?: ElementWrapper[][]): ElementWrapper[][] {
    const matrix = data || this.matrix;
    return matrix.map(row => row.map(cell => cell.copy()));
  }

  alter(x: number, y: number, newValue: any) {
    this.matrix[x][y].value = newValue;
    this.matrix[x][y].changed = true;
  }

  unAlter(x: number, y: number) {
    this.matrix[x][y].changed = false;
  }

  mark(x: number, y: number) {
    this.matrix[x][y].marked = true;
  }

  unMark(x: number, y: number) {
    this.matrix[x][y].marked = false;
  }

  markRow(x: number) {
    this.matrix[x].forEach(cell => cell.marked = true);
  }

  unMarkRow(x: number) {
    this.matrix[x].forEach(cell => cell.marked = false);
  }

  markColumn(y: number) {
    this.matrix.forEach(row => row[y].marked = true);
  }

  unMarkColumn(y: number) {
    this.matrix.forEach(row => row[y].marked = false);
  }

  removeCell(x: number, y: number) {
    this.matrix[x][y] = null;
    this.matrix = this.matrix.filter(row => row.filter(el => el !== null));
  }
}
