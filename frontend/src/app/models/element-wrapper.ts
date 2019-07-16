export class ElementWrapper {
  val: any;

  constructor(
    public value: any,
    public marked: boolean = false,
    public changed: boolean = false,
    private id?: string
  ) {
    this.id = id || this.getId();
  }

  copy() {
    return new ElementWrapper(this.value, this.marked, this.changed, this.id);
  }

  reset() {
    [this.value, this.marked, this.changed] = [undefined, false, false];
  }

  getId() {
    if (this.id) { return this.id; }
    return makeKey(16);
  }
}

export function makeKey(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
