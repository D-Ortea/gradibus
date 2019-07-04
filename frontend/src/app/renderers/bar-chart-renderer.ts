import { Renderer } from './renderer';
import { Item } from '../models/Item';
import * as d3 from 'd3';

export class BarChartRenderer implements Renderer {
  renderElement: HTMLDivElement;

  private svg: d3.Selection<any, any, any, any>;
  private height: number;
  private width: number;
  private arrayGroup: any;
  private transition: d3.Transition<any, any, any, any>;
  private xScale: d3.ScaleBand<string>;
  private yScale: d3.ScaleLinear<number, number>;
  private margin = { top: 20, right: 0, bottom: 30, left: 40 };

  constructor() {
    this.renderElement = document.createElement('div');
    this.height = 500;
    this.width = 800;
    this.svg = d3.select(this.renderElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height).attr('class', 'svg-bar-chart');

    this.arrayGroup = this.svg.append('g').attr('class', 'array-group');
  }

  render(array: Item[], animationSpeed: number): void {
    this.transition  = d3.transition().duration(animationSpeed / 2);
    this.calculateXandYscales(array);

    this.arrayGroup.selectAll('g').data(array, d => d.getId())
      .join(
        enter => this.appendBar(enter),
        update => this.updateBar(update)
      );
  }

  private calculateXandYscales(array: Item[]) {
    const ids = array.map(el => el.getId());
    this.xScale = d3.scaleBand().domain(ids)
      .range([this.margin.left, this.width - this.margin.right]).padding(0.1);
    this.yScale = d3.scaleLinear().domain([0, d3.max(array.map(x => x.value))])
      .nice().range([this.height - this.margin.bottom, this.margin.top]);
  }

  private appendBar(enter) {
    const g = enter.append('g');

    this.moveBarToPosition(g);
    this.appendRectangle(g);
    this.appendText(g);
  }

  private moveBarToPosition(g) {
    g.transition(this.transition).attr('transform',
      (d: Item) =>
        `translate(${this.xScale(d.getId())}, ${this.yScale(d.value)})`);
  }

  private appendRectangle(g) {
    const rect = g.append('rect');
    this.updateRectangleDimensions(rect);
  }

  private appendText(g) {
    const text = g.append('text').text((d: Item) => d.value);
    this.updateTextPosition(text);
  }

  private updateTextPosition(text) {
    text.attr('dy', '-0.5em')
      .attr('dx', this.xScale.bandwidth() / 2 - 4);
  }

  private updateRectangleDimensions(rect) {
    rect.attr('height', (d: Item) => this.yScale(0) - this.yScale(d.value))
      .attr('width', this.xScale.bandwidth());
  }

  private updateBar(update) {
    update.attr('class', (d) => this.parseClass(d))
      .transition(this.transition).attr('transform',
        (d: Item) =>
          `translate(${this.xScale(d.getId())}, ${this.yScale(d.value)})`);

    this.updateRectangleDimensions(update.select('rect'));
    this.updateTextPosition(update.select('text'));
  }

  private parseClass(cell: Item) {
    return `${cell.changed ? 'swap-bar' : ''} ${cell.marked ? 'mark-bar' : ''}`
      .trim();
  }
}
