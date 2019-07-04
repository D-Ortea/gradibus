import { AbstractSort } from './abstract-sort';

export class BubbleSort extends AbstractSort {
  sort() {
    const arr = this.array;
    this.logger.logLine(`Bubble Sorting array: (${arr}`);
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        this.player.delay();
        this.chart.mark(j);
        this.player.delay();
        this.chart.mark(j + 1);
        this.logger.logLine(`Comparing: (${arr[j]} > ${arr[j + 1]})`);
        this.player.delay();
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.chart.swap(j, j + 1);
          this.logger.logLine(`Swapping (${arr[j]}) and (${arr[j + 1]})`);
          this.player.delay();
          this.logger.logLine(`Array: ${arr}`);
          this.player.delay();
        }
        this.chart.unMark(j);
        this.chart.unMark(j + 1);
        this.player.delay();
      }
    }

    this.logger.logLine(`Array: ${arr}`);
    this.player.delay();
    return arr;
  }
}
