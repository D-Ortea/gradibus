export interface Renderer {
  renderElement: HTMLElement;

  render(data: any): void;
}
