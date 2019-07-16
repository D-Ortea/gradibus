import { ModelFactory } from 'src/app/models/model-factory';
import { LoggerModel } from 'src/app/models/logger-model';
import { TreeModel } from 'src/app/models/tree-model';
import { AbstractAlgorithm } from './abstract-algorithm';


class Node {
  constructor(public value: number, public left?: Node, public right?: Node) {
  }
}

export class BinarySearchTree extends AbstractAlgorithm {

  private logger: LoggerModel;
  private treeR: TreeModel;

  root: Node;

  constructor() {
    super();
    this.treeR = ModelFactory.getTreeModel(this.modelContainer);
    this.logger = ModelFactory.getLoggerModel(this.modelContainer);
    this.root = null;
  }

  create(values: number[]) {
    this.logger.reset();
    for (const value of values) {
      this.insert(value);
      this.player.delay();
      this.logger.logLine(`Inserting node (${value})`);
      this.logger.logLine(this.getTreeStr(this.root));
    }
    return this.root;
  }

  search(value: number) {
    let walk = this.root;

    this.logger.logLine(`Searching node (${value})`);
    this.player.delay();

    while (walk) {
      this.logger.logLine(`At node (${walk.value})`);
      this.player.delay();
      if (walk.value === value) {
        this.player.delay();
        this.logger.logLine(`Node (${value}) found!!`);
        return walk;
      }

      walk = this.walkDown(walk, value);
    }

    this.logger.logLine(`Node (${walk}) not found!!`);
    this.player.delay();
    return walk.value;
  }

  private walkDown(walk: Node, value: number): Node {
    if (value < walk.value) {
      this.logger.logLine(`[(${value}) > (${walk.value})] Walking right...`);
      this.player.delay();
      walk = walk.left;
    } else {
      this.logger.logLine(`[(${value}) < (${walk.value})] Walking left...`);
      this.player.delay();
      walk = walk.right;
    }
    return walk;
  }

  insert(value: number) {
    if (!this.root) {
      this.root = new Node(value);
      this.logger
        .logLine(`No root node. Creating root node (${value})`);
      this.treeR.initialize(this.root, this.normalize);
      this.player.delay();
      return;
    }

    let walk = this.root;

    while (walk) {
      this.treeR.compare(value, walk);
      this.logger.logLine(`At node (${walk.value})`);
      this.player.delay();

      if (walk.value === value) {
        this.logger.logLine(`Node already exists (${value})`);
        this.player.delay();
        this.treeR.removeCompare();
        return `Node already exists (${value})`;
      }

      walk = this.walkDownOrCreate(walk, value);
    }
    this.treeR.removeCompare();
    this.logger.logLine(this.getTreeStr(this.root));
    this.player.delay();
  }

  private walkDownOrCreate(walk: Node, value: number): Node {
    if (value > walk.value) {
      if (walk.right) {
        this.logger.logLine(`[(${value}) > (${walk.value})] Walking right`);
        this.player.delay();
        walk = walk.right;
      } else {
        this.createNode(value, walk, 'right');
        return null;
      }
    } else {
      if (walk.left) {
        this.logger.logLine(`[(${value}) < (${walk.value})] Walking left`);
        this.player.delay();
        walk = walk.left;
      } else {
        this.createNode(value, walk, 'left');
        return null;
      }
    }
    return walk;
  }

  private createNode(value: number, parent: Node, side: string) {
    this.logger.logLine(`(${value}) not found. Creating Node...`);
    this.player.delay();
    parent[side] = new Node(value);
    this.treeR.insertion(parent, parent[side]);
    this.player.delay();
    this.treeR.markEdge(parent, parent[side]);
  }

  private normalize(node) {
    const children = [node.left, node.right].filter(n => n);
    return children.length === 0 ? undefined : children;
  }

  getTreeStr(node: Node) {
    if (!node) { return ''; }

    let str = '';
    const walk = node;

    str += `(${walk.value}), L[${this.getTreeStr(walk.left)}], R[${this.getTreeStr(walk.right)}]`;

    return str;
  }
}
