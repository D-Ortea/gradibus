import { Model } from './model';
import { MatrixRenderer } from '../renderers/matrix-renderer';

export class MatrixModel implements Model {
  private matrix: Cell[][];

  renderer: MatrixRenderer;

  constructor() {
    this.renderer = new MatrixRenderer();
    this.matrix = [];
  }

  initialize(array: any[]): void {
    this.matrix = array.map(row => row.map((cell: any) => new Cell(cell)));
  }

  reset(): void {
    this.matrix.forEach(row => row.forEach(cell => cell.reset()));
  }

  getData(): Cell[][] {
    return this.matrix;
  }

  setData(newMatrix: Cell[][]): void {
    this.matrix = newMatrix;
  }

  getCopy(data?: Cell[][]): Cell[][] {
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
}


export class Cell {
  constructor(
    public value: any,
    public marked: boolean = false,
    public changed: boolean = false
  ) { }

  copy() {
    return new Cell(this.value, this.marked, this.changed);
  }

  reset() {
    [this.value, this.marked, this.changed] = [0, false, false];
  }
}
