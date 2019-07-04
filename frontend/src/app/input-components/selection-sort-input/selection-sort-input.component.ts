import { Component, OnInit } from '@angular/core';
import { SelectionSort } from 'src/algorithms/selection-sort';
import { SortInputComponent } from '../sort-input-component/sort-input-component.component';

@Component({
  selector: 'app-selection-sort-input',
  template: ' '
})
export class SelectionSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new SelectionSort();
    this.create();
  }
}
