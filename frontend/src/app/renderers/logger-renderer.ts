import { Renderer } from './renderer';

export class LoggerRenderer implements Renderer{
  noRender: boolean;
  renderElement: HTMLDivElement;
  _text: string;

  get text() {
    return this._text;
  }

  set text(newText: string) {
    this._text = newText;
    this.render();
  }
 
  constructor() {
    this.noRender = true;
    this.renderElement = document.createElement('div');
    this.renderElement.classList.add('log-rendering');
    this.text = '';
  }

  initialize(str: string): void {
    this.text = str;
  }

  render(): void {
    if (this.noRender) { return; }
    this.renderElement.innerHTML = this.text;
  }
  
  reset(): void {
    this.text = '';
  }

  getData(): string {
    return this.text;
  }

  setData(text: string): void {
    this.text = text;
  }

  getCopy(data?: string): string {
    const copy = data || this.text || " ";
    return copy;
  }

  log(str: string) {
    this.text += str.replace(/\n/g, '<br/>');
    this.render();
  }

  logLine(line: string) {
    this.text += `<br/>${line.replace(/\n/g, '<br/>')}`;
    this.render();
  }
}