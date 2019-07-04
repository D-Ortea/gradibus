import { Component, OnInit } from '@angular/core';
import { InsertionSort } from 'src/algorithms/insertion-sort';
import { SortInputComponent } from '../sort-input-component/sort-input-component.component';

@Component({
  selector: 'app-insertion-sort-input',
  template: ' '
})
export class InsertionSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new InsertionSort();
    this.create();
  }
}
