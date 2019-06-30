import { Renderer } from './renderer';
import * as d3 from "d3";

export class MatrixRenderer implements Renderer {
  noRender: boolean;
  renderElement: HTMLTableElement;
  matrix: Cell[][];

  constructor() { 
    this.noRender = true;
    this.matrix = [];
    this.createTable();
  }

  initialize(matrix: any[]): void {
    this.matrix = matrix.map(row => row.map(cell => new Cell(cell, this)));
  }

  createTable() {
    this.renderElement = document.createElement('table');
    this.renderElement.classList.add('.table');
    this.renderElement.appendChild(document.createElement('tbody'));
  }

  render() {
    if (this.noRender) { return; }
    
    d3.select(this.renderElement).selectAll('tr').data(this.matrix).join('tr')
      .selectAll('td').data(d => d).join(
        enter => enter.append('td').text(cell => cell.value),
        update => {
          update.attr('class', cell => {
            return this.parseClass(cell);
          });
          update.text(cell => cell.value);
        }
      );

    return true;
  }

  reset() {
    this.matrix.forEach(row => row.forEach(cell => {
      cell.value = 0;
      cell.marked = false;
      cell.changed = false;
    }));
  }

  getData(): Cell[][] { return this.matrix; }

  setData(newMatrix: Cell[][]) { this.matrix = newMatrix; }

  getCopy(data?: Cell[][]): Cell[][] {
    const matrix = data || this.matrix;
    return matrix.map(row => row.map(cell => cell.copy()));
  }

  private parseClass(cell: Cell) {
    return `${cell.changed ? 'changed' : ''} ${cell.marked ? 'marked' : ''}`.trim();
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


class Cell {
  constructor(
    private _value: any,
    private _renderer: MatrixRenderer,
    private _marked: boolean = false,
    private _changed: boolean = false
  ) { }

  get value() { return this._value; };
  set value(newValue: any) { 
    this._value = newValue;
    this.render();
  }

  get marked() { return this._marked; };
  set marked(newValue: boolean) { 
    this._marked = newValue;
    this.render();
  }

  get changed() { return this._changed; };
  set changed(newValue: boolean) { 
    this._changed = newValue;
    this.render();
  }
  
  private render() { this._renderer.render(); }

  copy() {
    return new Cell(this._value, this._renderer, this._marked, this._changed);
  }
}