export interface Renderer {
  noRender: boolean;

  render(): void;
  initialize(data: any): void;
  getData(): any;
  setData(data: any): void;
  getCopy(data?: any): any;
}