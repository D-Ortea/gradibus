import { Algorithm } from './algorithm';
import { MatrixRenderer } from 'src/app/render-components/matrix-renderer/matrix-renderer';
import { ExecutionContextService } from 'src/app/execution-context.service';
import { Renderer } from 'src/app/render-components/renderer';

const pseudocode = 
  `for j from 0 to W do:
      m[0, j] := 0

  for i from 1 to n do:
      for j from W to 0 do:
          if w[i] > j then:
              m[i, j] := m[i-1, j]
          else:
              m[i, j] := max(m[i-1, j], m[i-1, j-w[i]] + v[i])`;
  

const printMatrix = matrix => matrix.map(row => row.toString().replace(/,/g, ' ') + '\n')
  .toString().replace(/,/g, '');

const zeroes = dimensions => {
  let arr = [];

  for(let i = 0; i < dimensions[0]; i++) {
    arr.push(dimensions.length === 1 ? 0 : zeroes(dimensions.slice(1)));
  }

  return arr;
}

export class KnapsackAlgorithm implements Algorithm {
  player: ExecutionContextService;
  renderer: MatrixRenderer;
  rendererContainer: Map<string, Renderer>;

  constructor(
    private values: number[], 
    private weights: number[],
    private capacity: number
    ) {
      this.renderer = new MatrixRenderer();
    // Code.loadPseudocode(pseudocode);
  }

  *solve(): IterableIterator<any> {
    let k: any[] = zeroes([this.values.length + 1, this.capacity + 1]);
    this.renderer.initialize(k);

    // yield this.delayAndHighlight(1)

    let keep = [];
    for (let i = 1; i <= this.values.length; i++) {
      // yield this.delayAndHighlight(3)
      keep[i] = [];
      for (let j = +this.capacity; j >= 0; j--) {
        // yield this.delayAndHighlight(4);
        if (this.weights[i - 1] <= j 
          && k[i - 1][j] < this.values[i - 1] 
           + k[i - 1][j - this.weights[i - 1]]) {
          // yield this.delayAndHighlight(7);
          k[i][j] = this.values[i - 1] + k[i - 1][j - this.weights[i - 1]];
          keep[i][j] = 1;
          // yield this.delayAndHighlight(8);
        } else {
          // yield this.delayAndHighlight(5);
          k[i][j] = k[i - 1][j];
          keep[i][j] = 0;
          // yield this.delayAndHighlight(6);
        }
        
        yield this.player.delay();
        this.renderer.mark(i - 1, j);
        yield this.player.delay();
        this.renderer.alter(i, j, k[i][j]);
        yield this.player.delay();
        this.renderer.unMark(i - 1, j);
        yield this.player.delay();
        this.renderer.unAlter(i, j);
      }
    }

    console.log(printMatrix(k));
    return this.findSolution(keep, k);
  }

  findSolution(keep, k) {
    let j = +this.capacity;
    let result = { value: k[this.values.length][+this.capacity], tuple: [] };
    for (let i = this.values.length; i > 0; i--) {
      if (keep[i][j] == 1) {
        result.tuple.unshift(i - 1);
        j -= this.weights[i - 1];
      }
    }
    return result;
  }

  async delayAndHighlight(index) {
    // Code.highlightLine(index);
    // await this.player.delay();
    // Code.stopHighlightingLine(index);
  }

  
}



// Problems with solutions

///////// PROBLEM 1 /////////////////
// 10
// Values:  10,40,30,50
// Weights: 5,4,6,3
// Solution: 90 - [1, 3]
////////////////////////////////////

///////// PROBLEM 2 /////////////////
// 11
// Values:  8,9,4,18,11,4,6,5,4,7,6,5
// Weights: 5,1,5,8,14,14,5,3,15,4,5,14
// Solution: 27 - [1, 3]
////////////////////////////////////

///////// PROBLEM 3 /////////////////
// 25
// Values: 3,18,24,18,5,12,18,18,15,4,24,13,6,22,1,3,22,16,20,2
// Weights: 8,23,31,31,11,23,29,34,5,33,2,35,12,12,24,13,16,9,1,20
// Solution: 82 - [10, 13, 17, 18]
////////////////////////////////////