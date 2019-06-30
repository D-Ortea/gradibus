import { Renderer } from 'src/app/render-components/renderer';
import { ExecutionContextService } from 'src/app/execution-context.service';

export interface Algorithm {
  renderer: Renderer;
  player: ExecutionContextService;

  solve(): IterableIterator<string>;
}