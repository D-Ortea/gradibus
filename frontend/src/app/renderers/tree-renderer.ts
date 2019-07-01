import { Renderer } from './renderer';
import * as d3 from 'd3';

export class TreeRenderer implements Renderer {
  noRender: boolean;
  renderElement: HTMLDivElement;

  animationSpeed: number;
  currentData: any;
  currentLinks: any[];
  data: any;
  svg: any;
  g: any;
  edges: any;
  nodes: any;
  changed: boolean;
  deleted: boolean;

  constructor() { }

  initialize(data: any): void {
    this.data = data;
    this.animationSpeed = 30;
    this.createSvg();
  }

  private createSvg() {
    const renderArea = d3.select(this.renderElement);
    renderArea.node().innerHTML = '';
    this.svg = renderArea.append('svg').style('width', '500').style('height', '500');
    this.g = this.svg.append('g');
    this.g.attr('transform', `translate(250, 22)`);

    this.edges = this.g.append('g');
    this.nodes = this.g.append('g');
  }


  render(): void {
    const line = d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveBasis);

    this.currentData = this.tree();

    while (true) {
      if (!this.currentLinks || this.currentLinks.length === 0) {
        this.currentLinks = filterRepeated(links(this.currentData));
      }

      if (this.changed) {
        // Recalculate nodes
        this.updateTree();
        // Recalculate links
        this.currentLinks = filterRepeated(links(this.currentData));
        this.changed = false;
      }



      this.nodes.selectAll('g').data(this.currentData, d => d.key).join(
        enter => {
          const g = enter.append('g');
          g.append('circle').attr('class', d => d.val ?
            `node ${d.inserted ? 'node-inserted' : ''}` : 'hidden-node')
            .attr('r', 20);

          g.append('text').attr('transform', d => `translate(${-4}, ${4})`)
            .attr('class', 'node-text').text(d => d.val);

          g.attr('transform', d => `translate(${0}, ${0})`)
            .call(entr => entr.transition(this._t()).attr('transform', d => `translate(${d.x}, ${d.y})`));
        },
        update => update.call(updt => updt.transition(this._t()).attr('transform', d => `translate(${d.x}, ${d.y})`)
          .attr('class', d => `${d.marked ? 'node-marked' : ''}`)),
        exit => exit.call(ext => ext.transition(this._t()).attr('transform', d => `translate(${-100}, ${-100})`)
          .attr('class', d => `${d.deleted ? 'node-deleted' : ''}`).remove())
      );

      this.edges.selectAll('path').data(this.currentLinks)
        .join(
          enter => enter.append('path')
            .attr('d', d => line(linePoints(d))).attr('stroke', 'greenyellow')
            .call(entr => entr.transition(this._t()).attr('stroke', 'black')),
          update => update.attr('stroke', 'black').attr('d', d => line(linePoints(d)))
            .call(updt => updt.transition(this._t()).attr('stroke', d => `${d.marked ? 'orange' : 'black'}`)),
          exit => exit.attr('stroke', 'red')
            .call(ext => ext.transition(this._t()).attr('stroke', 'black').remove())
        );

      return;
    }
  }
  reset(): void {
    throw new Error('Method not implemented.');
  }
  getData() {
    throw new Error('Method not implemented.');
  }
  setData(data: any): void {
    throw new Error('Method not implemented.');
  }
  getCopy(data?: any) {
    throw new Error('Method not implemented.');
  }

  createTree(root) {
    const treeBuilder = node => {
      if (!node) { return {name: undefined}; }

      if (!node.left && !node.right) {
        return {name: node.value, children: [] };
      }

      return {name: node.value, children: [treeBuilder(node.left), treeBuilder(node.right)] };
    };

    const data = treeBuilder(root);
    return data;
  }

  tree() {
    const root = d3.hierarchy(this.data);
    root.dx = 80;
    root.dy = 500 / (root.height + 1);
    const tree = d3.tree().nodeSize([root.dx, root.dy])(root);
    const newTree = tree.descendants().map(desc => {
      return {
        key: makeKey(16),
        x: Math.floor(desc.x),
        y: Math.floor(desc.y),
        val: desc.data.name,
        links: desc.data.children ? desc.data.children.map(child => child.name) : []
      };
    });

    console.log(newTree);

    return newTree;
  }

  updateTree() {
    const flatenTree = root => {
      if (!root.children || root.children.length === 0) { return root; }
      return [root, ...root.children.map(el => flatenTree(el))].flatMap(d => d);
    };

    if (this.deleted) {
      const tree = flatenTree(this.data);
      this.currentData = this.currentData.filter(node => tree.find(el => el.name === node.val));
      this.deleted = false;
      return;
    }


    const newTree = this.tree();

    for (const el of newTree) {
      const index = this.currentData.findIndex(elem => elem.val === el.val);
      if (index === -1) {
        this.currentData.push(el);
        continue;
      }
      const node = this.currentData[index];
      [node.x, node.y, node.links] = [el.x, el.y, el.links];
    }

    this.currentData = this.currentData.filter(node => newTree.find(el => el.val === node.val));
  }

  markNode(value) {
    this.currentData.find(el => el.val === value).marked = true;
    this.render();
  }

  markEdge(source, target) {
    this.currentLinks.find(link => link.source.val === source.value
      && link.target.val === target.value).marked = true;
    this.render();
  }

  compare(value, to) {
    const n1 = this.currentData.find(el => el.val === to.value);

    if (!n1) { return; }

    let n2 = this.currentData.find(el => el.comparable);
    if (n2) {
      [n2.x, n2.y] = [n1.x - 40, n1.y];
    } else {
      n2 = { ...n1 };
      n2.key = makeKey(16);
      n2.x = n1.x - 40;
      n2.val = value;
      n2.links = [];
      n2.comparable = true;
      this.currentData.push(n2);
    }
    this.render();
  }

  removeCompare() {
    const nodeIndex = this.currentData.findIndex(el => el.comparable);
    if (nodeIndex === -1) { return; }
    this.currentData.splice(nodeIndex, 1);
  }

  insertion(root, node) {
    const newData =  this.createTree(root);
    this._findInTree(node.value).inserted = true;
    this.data = newData;
    this.changed = true;
    this.render();
  }

  deletion(root, node) {
    const newData =  this.createTree(root);
    this._findInTree(node.value).deleted = true;
    this.data = newData;
    this.deleted = true;
    this.render();
  }

  _t() {
    return this.svg.transition().duration(this.animationSpeed);
  }

  _findInTree(value) {
    const flatenTree = root => {
      if (!root.children || root.children.length === 0) { return root; }
      return [root, ...root.children.map(el => flatenTree(el))].flatMap(d => d);
    };

    return flatenTree(this.data).find(el => el.name === value);
  }
}

function createLink(from, to) {
  return {
    source: from,
    target: to
  };
}

function links(graph) {
  console.log(graph);
  return graph.map(from => from.links.map(to => createLink(from
    , graph.find(el => el.val === to)))).flatMap(d => d);
}


function myIncludes(arr, link2) {
  return arr.filter(link1 => linkEquals(link1, link2)).length === 1;
}


function linkEquals(link1, link2) {
  return (link1.source === link2.source || link1.source === link2.target) &&
    (link1.target === link2.target || link1.target === link2.source);
}


function filterRepeated(edges) {
  const filteredLinks = [];
  for (const edge of edges) {
    if (!edge.source || !edge.target || !edge.target.val || !edge.source.val) {
      continue;
    } // If any of the nodes is undefined we filter it
    if (!myIncludes(filteredLinks, edge)) {
      filteredLinks.push(edge);
    }
  }
  return filteredLinks;
}

function linePoints(d) {
  return [
    [d.source.x, d.source.y],
    [d.target.x, d.target.y]
  ];
}

function makeKey(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
