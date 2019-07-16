import { Renderer } from './renderer';
import { ElementWrapper } from '../models/element-wrapper';
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

  render(matrix: ElementWrapper[][]) {
    d3.select(this.renderElement).selectAll('tr').data(matrix).join('tr')
      .selectAll('td').data(d => d).join(
        enter => enter.append('td').text(cell => cell.value),
        update => update.call(this.updateCell, this)
      );

    return true;
  }

  private updateCell(update, context) {
    update.attr('class', cell => {
      return context.parseClass(cell);
    });
    update.text(cell => cell.value);
  }

  private parseClass(cell: ElementWrapper) {
    return `${cell.changed ? 'changed' : ''} ${cell.marked ? 'marked' : ''}`
      .trim();
  }
}
