import { Algorithm } from './algorithm';
import { ModelContainer } from 'src/app/renderers/renderer-container';
import { ExecutionContextService } from 'src/app/execution-context.service';
import { LoggerModel } from 'src/app/models/logger-model';
import { TreeModel } from 'src/app/models/tree-model';


class Node {
  constructor(public value: number, public left?: Node, public right?: Node) {
  }
}

export class BinarySearchTreeAlgorithm implements Algorithm {
  modelContainer: ModelContainer;
  player: ExecutionContextService;
  root: Node;
  operation: () => any;

  logger: LoggerModel;
  treeR: TreeModel;

  constructor() {
    this.modelContainer = new ModelContainer(
      ['logger', new LoggerModel()]
    );
    // this.treeR = this.rendererContainer.find('tree') as TreeModel;
    this.logger = this.modelContainer.find('logger') as LoggerModel;
    this.root = null;
  }

  setOperation(fn: () => void, reset = false) {
    console.log('Reset is' + reset);
    if (reset) { this.root = undefined; }
    this.operation = fn;
  }

  solve() {
      this.operation();
      return true;
   }

  create(values: number[]) {
    for (const value of values) {
      this.player.delay();
      this.logger.logLine(`Inserting node (${value})`);
      this.insert(value);
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
      this.player.delay();
      return;
    }

    let walk = this.root;

    while (walk) {
      // this.treeR.compare(value, walk);
      this.logger.logLine(`At node (${walk.value})`);
      this.player.delay();

      if (walk.value === value) {
        this.logger.logLine(`Node already exists (${value})`);
        this.player.delay();
        // this.treeR.removeCompare();
        return `Node already exists (${value})`;
      }

      walk = this.walkDownOrCreate(walk, value);
    }
    // this.treeR.removeCompare();
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
    // this.treeR.insertion(this.root, parent[side]);
    // this.player.delay();
    // this.treeR.markEdge(parent, parent[side]);
  }

  getTreeStr(node: Node) {
    if (!node) { return ''; }

    let str = '';
    const walk = node;

    str += `(${walk.value}), L[${this.getTreeStr(walk.left)}], R[${this.getTreeStr(walk.right)}]`;

    return str;
  }
}
