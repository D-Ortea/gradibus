import { Renderer } from './renderer';
import { Item } from '../models/Item';
import * as d3 from 'd3';

export class BarChartRenderer implements Renderer {
  renderElement: HTMLDivElement;

  private svg: d3.Selection<any, any, any, any>;
  private height: number;
  private width: number;
  private arrayGroup: any;
  private animationSpeed: number;
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
    this.animationSpeed = animationSpeed || 0;
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

    g.attr('transform',
      (d: Item) =>
        `translate(${this.xScale(d.getId())}, ${this.yScale(d.value)})`)
      .append('rect')
        .attr('height', (d: Item) => this.yScale(0) - this.yScale(d.value))
        .attr('width', this.xScale.bandwidth());

    g.append('text').text((d: Item) => d.value).attr('dy', '-0.5em')
      .attr('dx', this.xScale.bandwidth() / 2 - 4);
  }

  private updateBar(update) {
    const t = d3.transition().duration(this.animationSpeed / 2);

    update.attr('class', (d) => this.parseClass(d))
      .transition(t).attr('transform',
        (d: Item) =>
          `translate(${this.xScale(d.getId())}, ${this.yScale(d.value)})`);
  }

  private parseClass(cell: Item) {
    console.log('class called!!');
    return `${cell.changed ? 'swap-bar' : ''} ${cell.marked ? 'mark-bar' : ''}`
      .trim();
  }
}
