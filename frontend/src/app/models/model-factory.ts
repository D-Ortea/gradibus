import { LoggerModel } from 'src/app/models/logger-model';
import { MatrixModel } from 'src/app/models/matrix-model';
import { TreeModel } from 'src/app/models/tree-model';
import { BarChartModel } from 'src/app/models/bar-chart-model';
import { ModelContainer } from '../renderers/model-container';

export abstract class ModelFactory {

  public static getLoggerModel(container: ModelContainer): LoggerModel {
    const logger = new LoggerModel();
    container.insert(['logger', logger]);
    return logger;
  }

  public static getMatrixModel(container: ModelContainer): MatrixModel {
    const matrix = new MatrixModel();
    container.insert(['matrix', matrix]);
    return matrix;
  }

  public static getTreeModel(container: ModelContainer): TreeModel {
    const tree = new TreeModel();
    container.insert(['tree', tree]);
    return tree;
  }

  public static getBarChartModel(container: ModelContainer): BarChartModel {
    const chart = new BarChartModel();
    container.insert(['barChart', chart]);
    return chart;
  }

  // public static getGraphModel(container: ModelContainer): GraphModel {
  //   const graph = new GraphModel();
  //   container.insert(['graph', graph]);
  //   return graph;
  // }
}
