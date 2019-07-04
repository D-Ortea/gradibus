import { SortAlgorithm } from './sort-algorithm';
import { BarChartModel } from 'src/app/models/bar-chart-model';
import { LoggerModel } from 'src/app/models/logger-model';
import { ModelFactory } from 'src/app/models/model-factory';
import { AbstractAlgorithm } from './abstract-algorithm';

export abstract class AbstractSort extends AbstractAlgorithm implements SortAlgorithm {

  protected chart: BarChartModel;
  protected logger: LoggerModel;

  array: number[];

  constructor() {
    super();
    this.chart = ModelFactory.getBarChartModel(this.modelContainer);
    this.logger = ModelFactory.getLoggerModel(this.modelContainer);
    this.array = [];
  }

  create(array: number[]): any {
    this.array = array;
    this.chart.initialize(this.array);
    this.logger.initialize(`Creating array ${this.array}`);
    this.player.delay();
    return this.array;
  }

  abstract sort(): any;
}
