import { AbstractAlgorithm } from './abstract-algorithm';
import { BarChartModel } from 'src/app/models/bar-chart-model';
import { LoggerModel } from 'src/app/models/logger-model';
import { MatrixModel } from 'src/app/models/matrix-model';
import { ModelFactory } from 'src/app/models/model-factory';

export class SelectionSort extends AbstractAlgorithm {

  private chart: BarChartModel;
  private logger: LoggerModel;

  array: number[];

  constructor() {
    super();
    this.chart = ModelFactory.getBarChartModel(this.modelContainer);
    this.logger = ModelFactory.getLoggerModel(this.modelContainer);
  }

  create(array: number[]) {
    this.array = array;
    this.chart.initialize(this.array);
    this.logger.initialize(`Creating array ${this.array}`);
    this.player.delay();
    return this.array;
  }

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
