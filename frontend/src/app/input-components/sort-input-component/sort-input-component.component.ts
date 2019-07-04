import { Component, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/input/input.component';
import { Algorithm } from 'src/algorithms/algorithm';
import { SortAlgorithm } from 'src/algorithms/sort-algorithm';

@Component({
  selector: 'app-sort-input-component',
  templateUrl: './sort-input-component.component.html',
  styleUrls: ['./sort-input-component.component.css']
})
export class SortInputComponent extends InputComponent {

  protected values = '3,8,1,3,4,5,6,6,1';
  protected sortAlgo: Algorithm & SortAlgorithm;

  sort() {
    const options = { autoplay: true, skip: false, delete: true };
    super.sendFunction(this.sortAlgo,
      () => this.sortAlgo.sort(), options);
  }

  create(options = { autoplay: false, skip: true, delete: true }) {
    super.sendFunction(this.sortAlgo,
      () => this.sortAlgo.create(this.parse(this.values)), options);
  }

  protected parse(str: string) {
    return str.split(',').map(num => +num);
  }
}
