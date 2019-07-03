import { ModelFactory } from 'src/app/models/model-factory';
import { MatrixModel } from 'src/app/models/matrix-model';
import { LoggerModel } from 'src/app/models/logger-model';
import { AbstractAlgorithm } from './abstract-algorithm';

const pseudocode =
  `for j from 0 to W do:
      m[0, j] := 0

  for i from 1 to n do:
      for j from W to 0 do:
          if w[i] > j then:
              m[i, j] := m[i-1, j]
          else:
              m[i, j] := max(m[i-1, j], m[i-1, j-w[i]] + v[i])`;

export class Knapsack extends AbstractAlgorithm {
  private logger: LoggerModel;
  private problem: MatrixModel;
  private valuesModel: MatrixModel;
  private weightsModel: MatrixModel;

  constructor(
    private values: number[],
    private weights: number[],
    private capacity: number
  ) {
    super();
    this.logger = ModelFactory.getLoggerModel(this.modelContainer);
    this.problem = ModelFactory.getMatrixModel(this.modelContainer);
    this.valuesModel = ModelFactory.getMatrixModel(this.modelContainer);
    this.weightsModel = ModelFactory.getMatrixModel(this.modelContainer);
    // Code.loadPseudocode(pseudocode);
  }

  resolve(): string {
    const DP: any[] = this.zeroes([this.values.length + 1, this.capacity + 1]);

    this.problem.initialize(DP);
    this.valuesModel.initialize([this.values]);
    this.weightsModel.initialize([this.weights]);

    // this.delayAndHighlight(1)
    for (let i = 0; i <= this.values.length; i++) {
      for (let j = 0; j <= this.capacity; j++) {
        if (i === 0 || j === 0) {
          /*
          If we have no items or maximum weight we can take in collection is 0
          then the total weight in our collection is 0
          */
          DP[i][0] = 0;
          this.problem.alter(i, j, DP[i][j]);
          this.player.delay();
          this.problem.unAlter(i, j);
        } else if (this.weights[i - 1] <= j) { // take the current item in our collection
          this.valuesModel.mark(0, i - 1);
          this.player.delay();
          this.weightsModel.mark(0, i - 1);
          this.player.delay();
          this.problem.mark(i - 1, j);
          this.player.delay();

          const A = this.values[i - 1] + DP[i - 1][j - this.weights[i - 1]];
          const B = DP[i - 1][j];
          /*
          find the maximum of these two values
          and take which gives us a greater weight
           */
          if (A > B) {
            DP[i][j] = A;
            this.problem.alter(i, j, DP[i][j]);
            this.player.delay();
          } else {
            DP[i][j] = B;
            this.problem.alter(i, j, DP[i][j]);
            this.player.delay();
          }

          this.problem.unMark(i - 1, j);
          this.problem.unAlter(i, j);
          this.weightsModel.unMark(0, i - 1);
          this.valuesModel.unMark(0, i - 1);
        } else { // leave the current item from our collection
          DP[i][j] = DP[i - 1][j];
          this.problem.alter(i, j, DP[i][j]);
          this.player.delay();
          this.problem.unAlter(i, j);
        }
      }
    }

    this.player.delay();
    this.logger.log(this.printMatrix(DP));
    this.player.delay();
    this.logger.logLine(`Best value we can achieve is ${DP[this.values.length][this.capacity]}`);
    this.player.delay();
    return `Best value we can achieve is ${DP[this.values.length][this.capacity]}`;
  }

  private async delayAndHighlight(index) {
    // Code.highlightLine(index);
    // this.player.delay();
    // Code.stopHighlightingLine(index);
  }

  private printMatrix(matrix: any[]): string {
    return matrix.map(row => row.toString().replace(/,/g, ' ') + '\n')
      .toString().replace(/,/g, '');
  }

  private zeroes(dimensions: any[]) {
    const arr = [];

    for (let i = 0; i < dimensions[0]; i++) {
      arr.push(dimensions.length === 1 ? 0 : this.zeroes(dimensions.slice(1)));
    }

    return arr;
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
//       this.valueModel.mark(0, i - 1);
//       yield this.player.delay();
//       this.weightsModel.mark(0, i - 1);
//       yield this.player.delay();
//       this.problemModel.mark(i - 1, j);

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
//     this.problemModel.mark(i - 1, j);
//     yield this.player.delay();
//     this.problemModel.alter(i, j, k[i][j]);
//     yield this.player.delay();
//     this.problemModel.unMark(i - 1, j);
//     yield this.player.delay();
//     this.problemModel.unAlter(i, j);
//   }
// }


// private findSolution(keep, k) {
//   let j = +this.capacity;
//   const result = { value: k[this.values.length][+this.capacity], tuple: [] };
//   for (let i = this.values.length; i > 0; i--) {
//     if (keep[i][j] === 1) {
//       result.tuple.unshift(i - 1);
//       j -= this.weights[i - 1];
//     }
//   }
//   return result;
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
