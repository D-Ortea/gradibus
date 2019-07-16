import { Renderer } from './renderer';
import { TreeNode } from '../models/tree-node';
import * as d3 from 'd3';

export class TreeRenderer implements Renderer {

  private transition: d3.Transition<any, any, any, any>;
  private height: number;
  private width: number;
  private svg: d3.Selection<any, any, any, any>;
  private treeGroup: any;
  private margin = { top: 20, right: 0, bottom: 30, left: 40 };
  private radius = 16;
  private edges: any;
  private nodes: any;

  renderElement: HTMLDivElement;

  constructor() {
    this.renderElement = document.createElement('div');
    [this.height, this.width] = [500, 800];

    this.renderElement.classList.add('tree-rendering-area');
    this.svg = d3.select(this.renderElement).append('svg')
      .attr('class', 'tree-svg')
      .attr('width', this.width).attr('height', this.height);

    this.treeGroup = this.svg.append('g');
    this.treeGroup.attr('transform',
      `translate(${this.width / 2}, ${this.margin.top})`);

    this.edges = this.treeGroup.append('g').attr('class', 'edges');
    this.nodes = this.treeGroup.append('g').attr('class', 'nodes');
  }

  render(root: TreeNode, animationSpeed: number): void {
    this.transition = d3.transition().duration(animationSpeed);
    const hierarchy = d3.hierarchy(root);
    const tree = d3.tree().nodeSize(
      [this.radius * 4, this.radius * 5])(hierarchy);

    this.nodes.selectAll('g').data(tree.descendants(), d => d.data.getId()).join(
      enter => this.appendNode(enter),
      update => this.updateNode(update),
      exit => this.deleteNode(exit)
    );

    this.edges.selectAll('path').data(tree.links())
      .join(
        enter => this.appendPath(enter),
        update => this.updatePath(update),
        exit => this.deletePath(exit)
      );
  }

  private linePath(points) {
    return d3.line()([[points.source.x, points.source.y]
      , [points.target.x, points.target.y]]);
  }

  private appendNode(enter) {
    const g = enter.append('g').attr('class', 'tree-node');

    g.append('circle').attr('class', 'tree-circle').attr('r', this.radius);

    g.append('text').attr('transform', `translate(${-4}, ${4})`)
      .attr('class', 'tree-node-text').text(d => d.data.value);

    g.attr('transform', d => `translate(${0}, ${0})`)
      .call(entr => entr.transition(this.transition)
        .attr('transform', d => `translate(${d.x}, ${d.y})`));
  }

  private updateNode(update) {
    console.log(update);
    update.transition(this.transition)
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('class', d => `${d.data.marked ? 'node-marked' : ''}`);
  }

  private deleteNode(exit) {
    exit.transition(this.transition)
      .attr('transform', d => `translate(${-100}, ${-100})`)
      .attr('fill', 'red').remove();
  }

  private appendPath(enter) {
    enter.append('path')
      .attr('d', d => this.linePath(d)).attr('stroke', 'greenyellow')
      .call(entr => entr.transition(this.transition).attr('stroke', 'black'));
  }

  private updatePath(update) {
    update.attr('stroke', 'black').attr('d', d => this.linePath(d))
      .call(updt => updt.transition(this.transition)
        .attr('stroke', d => `${d.source.edgeTarget === d.target
          ? 'orange' : 'black'}`));
  }

  private deletePath(exit) {
    exit.attr('stroke', 'red').transition(this.transition)
      .attr('stroke', 'black').remove();
  }
}
