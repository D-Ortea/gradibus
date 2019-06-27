import { Component, OnInit } from '@angular/core';
import { ExecutionContextService } from '../execution-context.service';
import { KnapsackAlgorithm } from 'src/algorithms/knapsack-algorithm';
import { RenderService } from '../render.service';
import { MatrixRenderer } from 'src/renderers/matrix-renderer';

@Component({
  selector: 'app-knapsack-input',
  templateUrl: './knapsack-input.component.html',
  styleUrls: ['./knapsack-input.component.css']
})
export class KnapsackInputComponent implements OnInit {
  values: string;
  weights: string;
  capacity: number;

  constructor(
    private executionContext: ExecutionContextService,
    private renderService: RenderService
  ) { 
    [this.values, this.weights, this.capacity] = 
      ['10,40,30,50', '5,4,6,3', 10];
  }

  ngOnInit() {
    const parse = (str: string) => str.split(',').map(num => +num);
    const algo = new KnapsackAlgorithm(parse(this.values), parse(this.weights)
      , this.capacity);

    this.executionContext.setUpContext(algo, {autoplay: true, skip: true, delete: true});
  }

  
}

///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////