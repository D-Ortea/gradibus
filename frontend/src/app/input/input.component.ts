import { Component, OnInit } from '@angular/core';
import { ExecutionContextService } from 'src/app/execution-context.service';
import { RenderService } from 'src/app/render.service';
import { Algorithm } from 'src/algorithms/algorithm';
import { Options } from 'src/app/Options';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor(
    protected executionContext: ExecutionContextService,
    protected renderService: RenderService) { }

  ngOnInit() { }

  loadAlgorithmContext(algo: Algorithm, options: Options) {
    this.renderService.sendAlgorithm(algo);
    this.renderService.getRenderer().subscribe(renderer => {
      algo.renderer = renderer;
      this.executionContext.setUpContext(algo, options);
    });
  }
}
