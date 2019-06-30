import { Component, OnInit } from '@angular/core';
import { KnapsackAlgorithm } from 'src/algorithms/knapsack-algorithm';
import { InputComponent } from 'src/app/input/input.component';

@Component({
  selector: 'app-knapsack-input',
  templateUrl: './knapsack-input.component.html',
  styleUrls: ['./knapsack-input.component.css']
})
export class KnapsackInputComponent extends InputComponent implements OnInit {
  values: string = '10,40,30,50';
  weights: string = '5,4,6,3';
  capacity: number = 10;

  ngOnInit() { this.loadAlgoritm(); }

  solve() {
    this.loadAlgoritm();
  }

  loadAlgoritm() {
    const parse = (str: string) => str.split(',').map(num => +num);
    const algo = new KnapsackAlgorithm(parse(this.values), parse(this.weights)
      , this.capacity);    
    
    super.loadAlgorithmContext(algo, { autoplay: true, skip: true, delete: true });
  }
  
}

///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////