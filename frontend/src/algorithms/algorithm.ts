import { ExecutionContextService } from 'src/app/execution-context.service';
import { ModelContainer } from 'src/app/renderers/renderer-container';

export interface Algorithm {
  modelContainer: ModelContainer;
  player: ExecutionContextService;

  solve(): any;
}
