import { ExecutionContextService } from 'src/app/execution-context.service';
import { ModelContainer } from 'src/app/renderers/model-container';

export interface Algorithm {
  modelContainer: ModelContainer;
  player: ExecutionContextService;
  operation: () => any;

  solve(): any;
  setOperation(fn: () => void): void;
}
