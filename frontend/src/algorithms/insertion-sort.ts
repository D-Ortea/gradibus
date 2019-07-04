import { AbstractAlgorithm } from './abstract-algorithm';
import { LoggerModel } from 'src/app/models/logger-model';
import { BarChartModel } from 'src/app/models/bar-chart-model';
import { ModelFactory } from 'src/app/models/model-factory';
import { MatrixModel } from 'src/app/models/matrix-model';
import { SortAlgorithm } from './sort-algorithm';

export class InsertionSort extends AbstractAlgorithm implements SortAlgorithm {

  private chart: BarChartModel;
  private elements: MatrixModel;
  private logger: LoggerModel;

  array: number[];

  constructor() {
    super();
    this.chart = ModelFactory.getBarChartModel(this.modelContainer);
    this.elements = ModelFactory.getMatrixModel(this.modelContainer);
    this.logger = ModelFactory.getLoggerModel(this.modelContainer);
    this.array = [];
  }

  create(array: number[]) {
    this.array = array;
    this.chart.initialize(this.array.slice(0, 1));
    this.elements.initialize([this.array]);
    this.logger.initialize(`Creating array ${this.array}`);
    this.player.delay();
    return this.array;
  }

  sort() {
    const arr = this.array;
    this.logger.logLine(`Insertion Sorting array: (${arr}`);
    for (let i = 1; i < arr.length; i++) {
      this.player.delay();
      this.elements.mark(0, i);
      this.logger.logLine(`Insert value (${arr[i]})...`);
      this.player.delay();
      const newItem = arr[i];
      let j = i - 1;
      this.chart.mark(j);
      this.player.delay();
      for (; j >= 0 && arr[j] > newItem; j--) {
        this.logger.logLine(`Compare: (${arr[j]} > ${arr[j + 1]})`);
        this.chart.unMark(j);
        this.player.delay();
        if (j > 0) {
          this.chart.mark(j - 1);
          this.player.delay();
        }
        arr[j + 1] = arr[j];
      }
      this.chart.unMark(j < 0 ? 0 : j);
      this.chart.insert(newItem, j + 1);
      this.player.delay();
      arr[j + 1] = newItem;
      this.elements.unMark(0, i);
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
