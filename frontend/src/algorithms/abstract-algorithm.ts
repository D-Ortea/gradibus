import { Algorithm } from './algorithm';
import { ModelContainer } from 'src/app/renderers/model-container';
import { ExecutionContextService } from 'src/app/execution-context.service';

export abstract class AbstractAlgorithm implements Algorithm {
  modelContainer: ModelContainer;
  player: ExecutionContextService;
  operation: () => any;

  constructor() { this.modelContainer = new ModelContainer(); }

  solve() {
    return this.operation();
  }

  setOperation(fn: () => any) {
    this.operation = fn;
  }
}
