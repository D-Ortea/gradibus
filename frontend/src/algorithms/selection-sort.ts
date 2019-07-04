import { AbstractSort } from './abstract-sort';

export class SelectionSort extends AbstractSort {
  sort() {
    const arr = this.array;
    this.logger.logLine(`Selection Sorting array: (${arr}`);
    for (let i = 0; i < arr.length - 1; i++) {
      this.chart.mark(i);
      const minValueIndex = this.minumumValue(arr, i);
      this.player.delay();
      if (i !== minValueIndex) { this.chart.swap(i, minValueIndex); }
      [arr[i], arr[minValueIndex]] = [arr[minValueIndex], arr[i]];
      this.chart.unMark(i);
      this.player.delay();
    }
  }

  private minumumValue(arr: number[], lowerBound: number): number {
    let index = lowerBound;
    let elem = arr[lowerBound];
    this.logger.logLine(`Finding the minimum value in ${arr.slice(lowerBound)}`);
    this.player.delay();
    for (let i = lowerBound + 1; i < arr.length; i++) {
      this.chart.mark(i);
      this.player.delay();
      index = arr[i] < elem ? i : index;
      if (i === index) { this.logger.logLine(`New minimum ${arr[i]}`); }
      elem = arr[index];
      this.chart.unMark(i);
    }
    return index;
  }
}
