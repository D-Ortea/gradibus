import { AbstractAlgorithm } from './abstract-algorithm';

export class SelectionSort extends AbstractAlgorithm {
  array: number[];

  sort() {
    const arr = this.array;
    for (let i = 0; i < arr.length - 1; i++) {
      const minValueIndex = this.minumumValue(arr, i);
      [arr[i], arr[minValueIndex]] = [arr[minValueIndex], arr[i]];
    }
  }

  private minumumValue(arr: number[], lowerBound: number): number {
    let index = lowerBound;
    let elem = arr[lowerBound];
    for (let i = lowerBound; i < arr.length; i++) {
      index = arr[i] < elem ? i : index;
      elem = arr[index];
    }
    return index;
  }
}
