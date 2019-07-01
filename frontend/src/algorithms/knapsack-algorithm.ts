import { Algorithm } from './algorithm';
import { MatrixRenderer } from 'src/app/renderers/matrix-renderer';
import { ExecutionContextService } from 'src/app/execution-context.service';
import { RendererContainer } from 'src/app/renderers/renderer-container';
import { LoggerRenderer } from 'src/app/renderers/logger-renderer';

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
  const arr = [];

  for (let i = 0; i < dimensions[0]; i++) {
    arr.push(dimensions.length === 1 ? 0 : zeroes(dimensions.slice(1)));
  }

  return arr;
};

export class KnapsackAlgorithm implements Algorithm {
  player: ExecutionContextService;
  rendererContainer: RendererContainer;

  constructor(
    private values: number[],
    private weights: number[],
    private capacity: number
    ) {
      this.rendererContainer = new RendererContainer(
        ['problem', new MatrixRenderer()],
        ['values', new MatrixRenderer()],
        ['weights', new MatrixRenderer()],
        ['logger', new LoggerRenderer()]
      );
    // Code.loadPseudocode(pseudocode);
  }

  *solve(): IterableIterator<any> {
    const DP: any[] = zeroes([this.values.length + 1, this.capacity + 1]);
    const [problem, valuesR, weightsR, logger] = this.getRenderers();

    problem.initialize(DP);
    valuesR.initialize([this.values]);
    weightsR.initialize([this.weights]);

    // yield this.delayAndHighlight(1)
    for (let i = 0; i <= this.values.length; i++) {
      for (let j = 0; j <= this.capacity; j++) {
        if (i === 0 || j === 0) {
          /*
          If we have no items or maximum weight we can take in collection is 0
          then the total weight in our collection is 0
          */
          DP[i][0] = 0;
          problem.alter(i, j, DP[i][j]);
          yield this.player.delay();
          problem.unAlter(i, j);
        } else if (this.weights[i - 1] <= j) { // take the current item in our collection
          valuesR.mark(0, i - 1);
          yield this.player.delay();
          weightsR.mark(0, i - 1);
          yield this.player.delay();
          problem.mark(i - 1, j);
          yield this.player.delay();

          const A = this.values[i - 1] + DP[i - 1][j - this.weights[i - 1]];
          const B = DP[i - 1][j];
          /*
          find the maximum of these two values
          and take which gives us a greater weight
           */
          if (A > B) {
            DP[i][j] = A;
            problem.alter(i, j, DP[i][j]);
            yield this.player.delay();
          } else {
            DP[i][j] = B;
            problem.alter(i, j, DP[i][j]);
            yield this.player.delay();
          }

          problem.unMark(i - 1, j);
          problem.unAlter(i, j);
          weightsR.unMark(0, i - 1);
          valuesR.unMark(0, i - 1);
        } else { // leave the current item from our collection
          DP[i][j] = DP[i - 1][j];
          problem.alter(i, j, DP[i][j]);
          yield this.player.delay();
          problem.unAlter(i, j);
        }
      }
    }

    yield this.player.delay();
    logger.log(printMatrix(DP));
    yield this.player.delay();
    logger.logLine(`Best value we can achieve is ${DP[this.values.length][this.capacity]}`);
    yield this.player.delay();
    return `Best value we can achieve is ${DP[this.values.length][this.capacity]}`;
  }

  findSolution(keep, k) {
    let j = +this.capacity;
    const result = { value: k[this.values.length][+this.capacity], tuple: [] };
    for (let i = this.values.length; i > 0; i--) {
      if (keep[i][j] === 1) {
        result.tuple.unshift(i - 1);
        j -= this.weights[i - 1];
      }
    }
    return result;
  }

  private getRenderers(): any[] {
    return [
      this.rendererContainer.find('problem') as MatrixRenderer,
      this.rendererContainer.find('values') as MatrixRenderer,
      this.rendererContainer.find('weights') as MatrixRenderer,
      this.rendererContainer.find('logger') as LoggerRenderer
    ];
  }

  private async delayAndHighlight(index) {
    // Code.highlightLine(index);
    // await this.player.delay();
    // Code.stopHighlightingLine(index);
  }
}


// let keep = [];
// for (let i = 1; i <= this.values.length; i++) {
//   // yield this.delayAndHighlight(3)
//   keep[i] = [];
//   for (let j = +this.capacity; j >= 0; j--) {
//     // yield this.delayAndHighlight(4);
//     if (this.weights[i - 1] <= j
//       && k[i - 1][j] < this.values[i - 1]
//        + k[i - 1][j - this.weights[i - 1]]) {
//       // yield this.delayAndHighlight(7);
//       valuesR.mark(0, i - 1);
//       yield this.player.delay();
//       weightsR.mark(0, i - 1);
//       yield this.player.delay();
//       problem.mark(i - 1, j);

//       k[i][j] = this.values[i - 1] + k[i - 1][j - this.weights[i - 1]];
//       keep[i][j] = 1;
//       // yield this.delayAndHighlight(8);
//     } else {
//       // yield this.delayAndHighlight(5);
//       k[i][j] = k[i - 1][j];
//       keep[i][j] = 0;
//       // yield this.delayAndHighlight(6);
//     }

//     yield this.player.delay();
//     problem.mark(i - 1, j);
//     yield this.player.delay();
//     problem.alter(i, j, k[i][j]);
//     yield this.player.delay();
//     problem.unMark(i - 1, j);
//     yield this.player.delay();
//     problem.unAlter(i, j);
//   }
// }

// console.log(printMatrix(k));
// return this.findSolution(keep, k);

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
