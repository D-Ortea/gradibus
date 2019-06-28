import { Component, OnInit } from '@angular/core';
import { Renderer } from '../renderer';
import { RenderService } from 'src/app/render.service';
import { HistoryService } from 'src/app/history.service';
import * as d3 from "d3";

@Component({
  selector: 'app-matrix-renderer',
  templateUrl: './matrix-renderer.component.html',
  styleUrls: ['./matrix-renderer.component.css']
})
export class MatrixRendererComponent implements OnInit, Renderer {
  noRender: false;
  generator: IterableIterator<any>;
  matrix: Cell[][];

  constructor(
    private renderService: RenderService,
    private history: HistoryService
    ) { }

  ngOnInit() {
    this.renderService.sendRenderer(this);
  }

  getData(): Cell[][] { return this.matrix; }

  setData(newMatrix: Cell[][]) { this.matrix = newMatrix; }

  getCopy(data?: Cell[][]): Cell[][] {
    const matrix = data || this.matrix;
    return matrix.map(row => row.map(cell => cell.copy()));
  }

  initialize(matrix: any[]): void {
    this.matrix = matrix.map(row => row.map(cell => new Cell(cell, this)));
    this.render();
  }

  render() {
    if (this.noRender) { 
      this.history.addStep(this);
      return;
    }
    if (!this.generator) { this.generator = this._render(); }

    return this.generator.next();
  }

  private *_render() {
    const table = d3.select('#render-table');

    while(true) {
      table.selectAll('tr').data(this.matrix).join('tr')
      .selectAll('td').data(d => d).join(
        enter => enter.append('td').text(cell => cell.value),
        update => {
          update.attr('class', cell => {
            return this.parseClass(cell);
          });
          update.text(cell => cell.value);
        }
      );
        
      yield true;
    }
  }

  private parseClass(cell: Cell) {
    return `${cell.changed ? 'changed' : ''} ${cell.marked ? 'marked' : ''}`;
  }

  reset() {
    this.matrix.forEach(row => row.forEach(elem => {
      elem.value = 0;
      elem.changed = false;
      elem.marked = false;
    }));
  }

  alter(x: number, y: number, newValue) {
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
    private _renderer: MatrixRendererComponent,
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