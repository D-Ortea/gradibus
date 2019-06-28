import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AlgorithmService, AlgorithmMetadata } from '../algorithm.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  algorithmInput;

  constructor(
    private route: ActivatedRoute,
    private algoService: AlgorithmService
  ) { }

  ngOnInit() {
    const algoName = this.route.snapshot.paramMap.get('algo');    
    this.algorithmInput = this.algoService.getAlgorithm(algoName).component;
  }

  showSolution() {
    console.log('solution');
  }
}
///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////