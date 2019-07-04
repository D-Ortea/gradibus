import { Component, OnInit } from '@angular/core';
import { BubbleSort } from 'src/algorithms/bubble-sort';
import { SortInputComponent } from '../sort-input-component/sort-input-component.component';

@Component({
  selector: 'app-bubble-sort',
  template: ' '
})
export class BubbleSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new BubbleSort();
    this.create()
  }
}
