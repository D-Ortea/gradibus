export class Item {
  constructor(
    public value: any,
    public marked: boolean = false,
    public changed: boolean = false
  ) { }

  copy() {
    return new Item(this.value, this.marked, this.changed);
  }

  reset() {
    [this.value, this.marked, this.changed] = [0, false, false];
  }
}
