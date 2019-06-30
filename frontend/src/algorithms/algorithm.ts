import { ExecutionContextService } from 'src/app/execution-context.service';
import { RendererContainer } from 'src/app/render-components/renderer-container';

export interface Algorithm {
  rendererContainer: RendererContainer;
  player: ExecutionContextService;

  solve(): IterableIterator<string>;
}