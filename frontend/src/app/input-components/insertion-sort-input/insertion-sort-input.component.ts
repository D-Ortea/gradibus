import { Component, OnInit } from '@angular/core';
import { InsertionSort } from 'src/algorithms/insertion-sort';
import { SortInputComponent } from '../sort-input/sort-input.component';

@Component({
  selector: 'app-insertion-sort-input',
  templateUrl: '../sort-input/sort-input.component.html',
  styleUrls: ['../sort-input/sort-input.component.css']
})
export class InsertionSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new InsertionSort();
    this.create();
  }
}
