export interface Renderer {
  noRender: boolean;
  renderElement: HTMLElement;

  render(): void;
  initialize(data: any): void;
  getData(): any;
  setData(data: any): void;
  getCopy(data?: any): any;
  reset(): void;
}