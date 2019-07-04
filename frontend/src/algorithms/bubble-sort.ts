import { BarChartModel } from 'src/app/models/bar-chart-model';
import { LoggerModel } from 'src/app/models/logger-model';
import { AbstractAlgorithm } from './abstract-algorithm';
import { ModelFactory } from 'src/app/models/model-factory';

export class BubbleSort extends AbstractAlgorithm {

  private logger: LoggerModel;
  private chart: BarChartModel;


  array: number[];

  constructor() {
    super();
    this.chart = ModelFactory.getBarChartModel(this.modelContainer);
    this.logger = ModelFactory.getLoggerModel(this.modelContainer);
    this.array = [];
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
