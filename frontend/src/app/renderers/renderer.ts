export interface Renderer {
  renderElement: HTMLElement;

  render(data: any, options?: any): void;
}
