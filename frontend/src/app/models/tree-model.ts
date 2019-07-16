import { Model } from './model';
import { TreeRenderer } from '../renderers/tree-renderer';
import { TreeNode } from './tree-node';

export class TreeModel implements Model {
  private data: TreeNode;

  renderer: TreeRenderer;

  constructor() {
    this.renderer = new TreeRenderer();
  }

  initialize(root: any, normFn: (n) => any[] = (n) => n.children): void {
    this.data = this.normalize(root, normFn);
  }

  reset(): void {
    this.data = null;
  }

  getData(): TreeNode {
    return this.data;
  }

  setData(data: TreeNode): void {
    this.data = data;
  }

  getCopy(data?: TreeNode) {
    const tree = data || this.data;
    return tree.copy();
  }

  markEdge(source, target) {
    this.find(this.data, source).edgeTarget
      = this.find(this.data, target.value);
  }

  compare(value, to) {
    this.find(this.data, to).marked = true;
  }

  removeCompare() {
    this.flattenTree(this.data).filter(node => node.marked).forEach(n => n.marked = false);
  }

  insertion(parent, node) {
    const elem = this.find(this.data, parent);
    elem.children = elem.children || [];
    elem.children.push(new TreeNode(node.value));
  }

  deletion(node) {
    this.deleteNode(this.data, node);
  }

  private normalize(node, fn): TreeNode {
    console.log(node);
    const root = new TreeNode(node.value);
    const children = fn(node);
    if (!children) { return root; }

    root.children = [];
    for (const child of children) {
      root.children.push(this.normalize(child, fn));
    }

    return root;
  }

  private deleteNode(root: TreeNode, node) {
    const filteredChildren = root.children.filter(el => el.value !== node.value);
    if (filteredChildren.length < root.children.length) {
      root.children = filteredChildren;
      return;
    }

    for (const child of root.children) {
      this.deleteNode(child, node);
    }
  }

  private find(root: TreeNode, node) {
    if (root.value === node.value) { return root; }
    if (!root.children) { return; }

    for (const child of root.children) {
      const foundElem = this.find(child, node);
      if (foundElem) { return foundElem; }
    }
  }

  private flattenTree(root: TreeNode) {
    const arr = [];
    if (root.children) {
      return [root, ...root.children.map(child => this.flattenTree(child))].flatMap((d) => d);
    }

    return [root];
  }
}
