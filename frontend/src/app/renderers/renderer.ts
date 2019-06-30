export interface Renderer {
  noRender: boolean;
  renderElement: HTMLElement;

  initialize(data: any): void;
  render(): void;
  reset(): void;
  getData(): any;
  setData(data: any): void;
  getCopy(data?: any): any;
}