import { AbstractSort } from './abstract-sort';

export class Quicksort extends AbstractSort {
  sort() {
    this.player.delay();
    this.logger.logLine(`Quicksorting ${this.array}`);
    this.quicksort(this.array, 0, this.array.length - 1);
    this.player.delay();
    this.logger.logLine(`Result ${this.array}`);
    this.player.delay();
    console.log(this.array);
  }

  private quicksort(arr: number[], low: number, high: number) {
    if (low < high) {
      const m = this.partition(arr, low, high);
      this.quicksort(arr, low, m - 1);
      this.quicksort(arr, m + 1, high);
    }
  }

  private partition(arr: number[], i: number, j: number) {
    const pivot = arr[i];
    let m = i;
    this.logger.logLine(`Partition ${arr.slice(i, j)}`);
    this.chart.mark(i);
    this.player.delay();

    for (let k = i + 1; k <= j; k++) {
      this.logger.logLine(`Comparing ${arr[k]} with pivot: ${pivot}`);
      this.chart.mark(k);
      this.player.delay();
      if (arr[k] < pivot) {
        m++;
        [arr[k], arr[m]] = [arr[m], arr[k]];
        this.logger.logLine(`Swapping ${arr[k]} and ${arr[m]}`);
        this.chart.swap(k, m);
        this.player.delay();
      }
    }

    this.logger.logLine(`Swapping ${arr[i]} and Pivot: ${arr[m]}`);
    this.chart.swap(i, m);
    this.player.delay();
    this.unmarkInRangeExcept(i, j, m);
    this.player.delay();
    [arr[i], arr[m]] = [arr[m], arr[i]];
    this.chart.unMark(m);
    this.player.delay();
    return m;
  }

  private unmarkInRangeExcept(i: number, j: number, m: number) {
    for (let k = i; k < j; k++) {
      if (k === i || k === m) { continue; }
      this.chart.unMark(k);
    }
  }
}

// 27,38,12,39,27,16
