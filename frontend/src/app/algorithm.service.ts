import { Injectable } from '@angular/core';
import { KnapsackInputComponent } from './input-components/knapsack-input/knapsack-input.component';
import { BinarySearchTreeInputComponent } from './input-components/binary-search-tree-input/binary-search-tree-input.component';

export class AlgorithmMetadata {
  video: string;

  constructor(
    public name: string,
    video: string,
    public tags: string[],
    public component: any
  ) {
    this.video = `/assets/algo-videos/${video}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  algorithms: AlgorithmMetadata[];

  constructor() {
    this.algorithms = [
      new AlgorithmMetadata('Knapsack Problem', 'knapsack-problem.mp4',
        ['dynamic programming', 'knapsack'], KnapsackInputComponent),
      new AlgorithmMetadata('Binary Search Tree', 'BST.mp4',
        ['tree', 'BST', 'search', 'branch and bound'],
        BinarySearchTreeInputComponent),
      new AlgorithmMetadata('Bubble Sort', 'bubble-sort.mp4', ['sort', 'brute force'],  {}),
      new AlgorithmMetadata('Merge Sort', 'merge-sort.mp4', ['sort', 'divide and conquer'],  {}),
      new AlgorithmMetadata('Quicksort', 'quicksort.mp4', ['sort', 'divide and conquer'],  {}),
      new AlgorithmMetadata('Radix Sort', 'radix-sort.mp4', ['sort', 'divide and conquer'],  {}),
      new AlgorithmMetadata('Pidgeonhole Sort', 'pidgeonhole-sort.mp4', ['sort', 'divide and conquer'],  {}),
    ];
   }

   getAlgorithms(): AlgorithmMetadata[] {
     return this.algorithms;
   }

   getAlgorithm(name: string): AlgorithmMetadata {
     return this.algorithms.find(algo => algo.name === name);
   }
}

