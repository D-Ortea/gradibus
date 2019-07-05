import { Component, OnInit } from '@angular/core';
import { BubbleSort } from 'src/algorithms/bubble-sort';
import { SortInputComponent } from '../sort-input/sort-input.component';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: '../sort-input/sort-input.component.html',
  styleUrls: ['../sort-input/sort-input.component.css']
})
export class BubbleSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new BubbleSort();
    this.create()
  }
}
