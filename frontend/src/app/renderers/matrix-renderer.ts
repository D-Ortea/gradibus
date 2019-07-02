import { Renderer } from './renderer';
import { Cell } from '../models/matrix-model';
import * as d3 from 'd3';

export class MatrixRenderer implements Renderer {
  renderElement: HTMLTableElement;

  constructor() {
    this.createTable();
  }

  createTable() {
    this.renderElement = document.createElement('table');
    this.renderElement.classList.add('.table');
    this.renderElement.appendChild(document.createElement('tbody'));
  }

  render(matrix: Cell[][]) {
    d3.select(this.renderElement).selectAll('tr').data(matrix).join('tr')
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

  private parseClass(cell: Cell) {
    return `${cell.changed ? 'changed' : ''} ${cell.marked ? 'marked' : ''}`.trim();
  }
}
