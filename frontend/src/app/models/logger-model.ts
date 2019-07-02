import { Model } from './model';
import { LoggerRenderer } from '../renderers/logger-renderer';

export class LoggerModel implements Model {
  private text: string;

  renderer: LoggerRenderer;

  get logText() {
    return this.text;
  }

  set logText(newText: string) {
    this.text = newText;
  }

  constructor() {
    this.renderer = new LoggerRenderer();
    this.text = ' ';
  }

  initialize(text: string): void {
    this.text = text;
  }

  reset(): void {
    this.text = ' ';
  }

  getData() {
    return this.text;
  }

  setData(text: string): void {
    this.text = text;
  }

  getCopy(data?: string): string {
    return data || this.text;
  }

  log(str: string) {
    this.text += str.replace(/\n/g, '<br/>');
  }

  logLine(line: string) {
    this.text += `<br/>${line.replace(/\n/g, '<br/>')}`;
  }
}
