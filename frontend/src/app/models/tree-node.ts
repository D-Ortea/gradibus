import { makeKey } from './element-wrapper';

export class TreeNode {
  constructor(
    public value?: any,
    public children?: TreeNode[],
    public id?: string,
    public marked: boolean = false,
    public changed: boolean = false,
    public edgeTarget?
  ) { }

  getId(): string {
    this.id = this.id || makeKey(16);
    return this.id;
  }

  reset() {
    [this.value, this.children, this.id] =
      [undefined, [], undefined];
  }

  copy() {
    const root = new TreeNode(this.value);
    root.id = this.id;
    root.marked = this.marked;
    root.changed = this.changed;
    root.children = undefined;
    if (!this.children) { return root; }

    root.children = [];
    for (const child of this.children) {
      root.children.push(child.copy());
    }

    return root;
  }
}
