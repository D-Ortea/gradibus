import { Component, OnInit } from '@angular/core';
import { SelectionSort } from 'src/algorithms/selection-sort';
import { SortInputComponent } from '../sort-input/sort-input.component';

@Component({
  selector: 'app-selection-sort-input',
  templateUrl: '../sort-input/sort-input.component.html',
  styleUrls: ['../sort-input/sort-input.component.css']
})
export class SelectionSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new SelectionSort();
    this.create();
  }
}
