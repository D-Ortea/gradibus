import { Injectable } from '@angular/core';
import { KnapsackInputComponent } from './input-components/knapsack-input/knapsack-input.component';
import { BinarySearchTreeInputComponent } from './input-components/binary-search-tree-input/binary-search-tree-input.component';
import { BubbleSortInputComponent } from './input-components/bubble-sort/bubble-sort-input.component';
import { InsertionSortInputComponent } from './input-components/insertion-sort-input/insertion-sort-input.component';
import { SelectionSortInputComponent } from './input-components/selection-sort-input/selection-sort-input.component';
import { MergeSortInputComponent } from './input-components/merge-sort-input/merge-sort-input.component';
import { QuicksortInputComponent } from './input-components/quicksort-input/quicksort-input.component';

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
  private algorithms: AlgorithmMetadata[];

  categories: { name: string, algorithms: AlgorithmMetadata[] }[];

  constructor() {
    this.categories = [
      {
        name: 'Brute Force', algorithms: [
          new AlgorithmMetadata('Bubble Sort', 'bubble-sort.mp4',
            ['sort', 'brute force'], BubbleSortInputComponent),
          new AlgorithmMetadata('Insertion Sort', 'bubble-sort.mp4',
            ['sort', 'brute force'], InsertionSortInputComponent),
          new AlgorithmMetadata('Selection Sort', 'bubble-sort.mp4',
            ['sort', 'brute force'], SelectionSortInputComponent),
        ]
      },
      {
        name: 'Divide and Conquer', algorithms: [
          new AlgorithmMetadata('Merge Sort', 'merge-sort.mp4',
            ['sort', 'divide and conquer'], MergeSortInputComponent),
          new AlgorithmMetadata('Quicksort', 'quicksort.mp4',
            ['sort', 'divide and conquer'], QuicksortInputComponent),
          new AlgorithmMetadata('Radix Sort', 'radix-sort.mp4', ['sort', 'divide and conquer'], {}),
          new AlgorithmMetadata('Pidgeonhole Sort', 'pidgeonhole-sort.mp4', ['sort', 'divide and conquer'], {}),
        ]
      },
      {
        name: 'Branch and Bound', algorithms: [
          new AlgorithmMetadata('Binary Search Tree', 'BST.mp4',
            ['tree', 'BST', 'search', 'branch and bound'],
            BinarySearchTreeInputComponent),
        ]
      },
      {
        name: 'Dynamic Programming', algorithms: [
          new AlgorithmMetadata('Knapsack Problem', 'knapsack-problem.mp4',
            ['dynamic programming', 'knapsack'], KnapsackInputComponent),
        ]
      }
    ];

    this.algorithms = this.categories
      .reduce((acc, category) => acc = [...acc, ...category.algorithms], []);
  }

  getAlgorithms(): AlgorithmMetadata[] {
    return this.algorithms;
  }

  getAlgorithm(name: string): AlgorithmMetadata {
    return this.getAlgorithms().find(algo => algo.name === name);
  }
}
