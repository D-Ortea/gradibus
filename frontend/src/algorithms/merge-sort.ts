import { AbstractSort } from './abstract-sort';

export class MergeSort extends AbstractSort {
  sort() {
    this.player.delay();
    this.mergeSort(this.array, 0, this.array.length - 1);
    this.logger.logLine(this.array.toString());
    console.log(this.array);
  }

  private mergeSort(arr: number[], low: number, high: number) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      this.mergeSort(arr, low, mid);
      this.mergeSort(arr, mid + 1, high);
      this.merge(arr, low, mid, high);
    }
  }

  private merge(arr: number[], low: number, mid: number, high: number) {
    const n = high - low  + 1;
    const result = [];
    let [left, right, idx] = [low, mid + 1, 0];
    while (left <= mid && right <= high) {
      result[idx++] = arr[(arr[left] <= arr[right]) ? left++ : right++];
    }
    while (left <= mid) {
      result[idx++] = arr[left++];
    }

    while (right <= high) {
      result[idx++] = arr[right++];
    }

    for (let k = 0; k < n; k++) {
      arr[low + k] = result[k];
    }
  }
}
