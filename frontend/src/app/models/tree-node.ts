import { makeKey } from './item';

export class TreeNode {
  constructor(
    public value?: any,
    public children?: TreeNode[],
    public parent?: TreeNode,
    public id?: string,
    public marked: boolean = false,
    public changed: boolean = false,
  ) { }

  getId(): string {
    this.id = this.id || makeKey(16);
    return this.id;
  }

  reset() {
    [this.value, this.children, this.parent, this.id] =
      [undefined, [], undefined, undefined];
  }
}
