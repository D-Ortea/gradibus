import { Component, OnInit } from '@angular/core';
import { Knapsack } from 'src/algorithms/knapsack';
import { InputComponent } from 'src/app/input/input.component';

@Component({
  selector: 'app-knapsack-input',
  templateUrl: './knapsack-input.component.html',
  styleUrls: ['./knapsack-input.component.css']
})
export class KnapsackInputComponent extends InputComponent implements OnInit {
  values = '10,40,30,50';
  weights = '5,4,6,3';
  capacity = 10;

  ngOnInit() { this.loadAlgoritm( { autoplay: false, skip: true, delete: true }); }

  solve() {
    this.loadAlgoritm();
  }

  loadAlgoritm(options = { autoplay: true, skip: false, delete: true }) {
    const parse = (str: string) => str.split(',').map(num => +num);
    const algo = new Knapsack(parse(this.values), parse(this.weights)
      , this.capacity);

    super.sendFunction(algo, algo.resolve, options);
  }

}

///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////
