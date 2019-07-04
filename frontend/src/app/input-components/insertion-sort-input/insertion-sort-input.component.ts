import { Component, OnInit } from '@angular/core';
import { InsertionSort } from 'src/algorithms/insertion-sort';
import { InputComponent } from 'src/app/input/input.component';

@Component({
  selector: 'app-insertion-sort-input',
  templateUrl: './insertion-sort-input.component.html',
  styleUrls: ['./insertion-sort-input.component.css']
})
export class InsertionSortInputComponent extends InputComponent implements OnInit {

  private values = '3,8,1,3,4,5,6,6,1';
  private sortAlgo: InsertionSort;

  ngOnInit() {
    this.create();
  }

  create(options = { autoplay: false, skip: true, delete: true }) {
    const parse = (str: string) => str.split(',').map(num => +num);
    this.sortAlgo = new InsertionSort();

    super.sendFunction(this.sortAlgo,
      () => this.sortAlgo.create(parse(this.values)), options);
  }

  sort() {
    const options = { autoplay: true, skip: false, delete: true };
    super.sendFunction(this.sortAlgo, this.sortAlgo.sort, options);
  }
}
