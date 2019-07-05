import { Component, OnInit } from '@angular/core';
import { SortInputComponent } from '../sort-input/sort-input.component';
import { MergeSort } from 'src/algorithms/merge-sort';

@Component({
  selector: 'app-merge-sort-input',
  templateUrl: '../sort-input/sort-input.component.html',
  styleUrls: ['../sort-input/sort-input.component.css']
})
export class MergeSortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new MergeSort();
    this.create();
  }
}
