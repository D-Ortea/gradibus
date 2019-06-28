import { Component, OnInit } from '@angular/core';
import { Renderer } from 'src/renderers/renderer';
import { RenderService } from 'src/app/render.service';

@Component({
  selector: 'app-matrix-renderer',
  templateUrl: './matrix-renderer.component.html',
  styleUrls: ['./matrix-renderer.component.css']
})
export class MatrixRendererComponent implements OnInit, Renderer {

  renderTest: string;

  constructor(private renderService: RenderService) { }

  ngOnInit() {
    this.renderService.sendRenderer(this);
  }

  render() {
    this.renderTest = `This is an dynamic component injected into the
    RenderComponent and called from the knapsack algorithm!`;
  }

}
