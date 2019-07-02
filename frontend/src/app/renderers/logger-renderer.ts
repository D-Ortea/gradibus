import { Renderer } from './renderer';

export class LoggerRenderer implements Renderer {
  renderElement: HTMLDivElement;

  constructor() {
    this.renderElement = document.createElement('div');
    this.renderElement.classList.add('log-rendering');
  }

  render(text: string): void {
    this.renderElement.innerHTML = text;
  }
}
