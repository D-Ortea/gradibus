import { Algorithm } from './algorithm';
import { RendererContainer } from 'src/app/renderers/renderer-container';
import { ExecutionContextService } from 'src/app/execution-context.service';
import { TreeRenderer } from 'src/app/renderers/tree-renderer';
import { LoggerRenderer } from 'src/app/renderers/logger-renderer';


class Node {
  constructor(public value: number, public left?: Node, public right?: Node) {
  }
}

export class BinarySearchTreeAlgorithm implements Algorithm {
  rendererContainer: RendererContainer;
  player: ExecutionContextService;
  root: Node;
  operation: () => any;

  logger: LoggerRenderer;
  treeR: TreeRenderer;

  constructor() {
    this.rendererContainer = new RendererContainer(
      ['logger', new LoggerRenderer()]
    );
    // this.treeR = this.rendererContainer.find('tree') as TreeRenderer;
    this.logger = this.rendererContainer.find('logger') as LoggerRenderer;
    this.root = null;
  }

  setOperation(fn: () => void, reset = false) {
    console.log('Reset is' + reset);
    if (reset) { this.root = undefined; }
    this.operation = fn;
  }

  *solve() {
      yield this.operation();
      return true;
   }

  async create(values: number[]) {
    for (const value of values) {
      await this.player.delay();
      this.logger.logLine(`Inserting node (${value})`);
      await this.insert(value);
      this.logger.logLine(this.getTreeStr(this.root));
    }
    return this.root;
  }

  async search(value: number) {
    let walk = this.root;

    this.logger.logLine(`Searching node (${value})`);
    await this.player.delay();

    while (walk) {
      this.logger.logLine(`At node (${walk.value})`);
      await this.player.delay();
      if (walk.value === value) {
        await this.player.delay();
        this.logger.logLine(`Node (${value}) found!!`);
        return walk;
      }

      walk = await this.walkDown(walk, value);
    }

    this.logger.logLine(`Node (${walk}) not found!!`);
    await this.player.delay();
    return walk.value;
  }

  private async walkDown(walk: Node, value: number): Promise<Node> {
    if (value < walk.value) {
      this.logger.logLine(`[(${value}) > (${walk.value})] Walking right...`);
      await this.player.delay();
      walk = walk.left;
    } else {
      this.logger.logLine(`[(${value}) < (${walk.value})] Walking left...`);
      await this.player.delay();
      walk = walk.right;
    }
    return walk;
  }

  async insert(value: number) {
    if (!this.root) {
      this.root = new Node(value);
      this.logger
        .logLine(`No root node. Creating root node (${value})`);
      await this.player.delay();
      return;
    }

    let walk = this.root;

    while (walk) {
      // this.treeR.compare(value, walk);
      this.logger.logLine(`At node (${walk.value})`);
      await this.player.delay();

      if (walk.value === value) {
        this.logger.logLine(`Node already exists (${value})`);
        await this.player.delay();
        // this.treeR.removeCompare();
        return `Node already exists (${value})`;
      }

      walk = await this.walkDownOrCreate(walk, value);
    }
    // this.treeR.removeCompare();
    this.logger.logLine(this.getTreeStr(this.root));
    await this.player.delay();
  }

  private async walkDownOrCreate(walk: Node, value: number): Promise<Node> {
    if (value > walk.value) {
      if (walk.right) {
        this.logger.logLine(`[(${value}) > (${walk.value})] Walking right`);
        await this.player.delay();
        walk = walk.right;
      } else {
        this.createNode(value, walk, 'right');
        return null;
      }
    } else {
      if (walk.left) {
        this.logger.logLine(`[(${value}) < (${walk.value})] Walking left`);
        await this.player.delay();
        walk = walk.left;
      } else {
        this.createNode(value, walk, 'left');
        return null;
      }
    }
    return walk;
  }

  private async createNode(value: number, parent: Node, side: string) {
    this.logger.logLine(`(${value}) not found. Creating Node...`);
    await this.player.delay();
    parent[side] = new Node(value);
    // this.treeR.insertion(this.root, parent[side]);
    // await this.player.delay();
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
