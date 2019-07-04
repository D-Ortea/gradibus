import { Component, OnInit } from '@angular/core';
import { SelectionSort } from 'src/algorithms/selection-sort';
import { InputComponent } from 'src/app/input/input.component';

@Component({
  selector: 'app-selection-sort-input',
  templateUrl: './selection-sort-input.component.html',
  styleUrls: ['./selection-sort-input.component.css']
})
export class SelectionSortInputComponent extends InputComponent implements OnInit {

  private values = '3,8,1,3,4,5,6,6,1';
  private sortAlgo: SelectionSort;

  ngOnInit() {
    this.create();
  }

  create(options = { autoplay: false, skip: true, delete: true }) {
    const parse = (str: string) => str.split(',').map(num => +num);
    this.sortAlgo = new SelectionSort();

    super.sendFunction(this.sortAlgo,
      () => this.sortAlgo.create(parse(this.values)), options);
  }

  sort() {
    const options = { autoplay: true, skip: false, delete: true };
    super.sendFunction(this.sortAlgo, this.sortAlgo.sort, options);
  }

}
