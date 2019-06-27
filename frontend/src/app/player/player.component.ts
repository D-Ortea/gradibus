import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnapsackAlgorithm } from 'src/algorithms/knapsack-algorithm';
import {AlgorithmService, AlgorithmMetadata } from '../algorithm.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  algoName: string;

  constructor(
    private route: ActivatedRoute,
    private algoService: AlgorithmService
  ) { }

  ngOnInit() {
    this.algoName = this.route.snapshot.paramMap.get('algo');    
  }

  showSolution() {
    console.log('solution');
  }

  getSelectedAlgorithm(): AlgorithmMetadata {
    return this.algoService.getAlgorithm(this.algoName);
  }
}
///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////