import { Component, OnInit } from '@angular/core';
import { SortInputComponent } from '../sort-input/sort-input.component';
import { Quicksort } from 'src/algorithms/quicksort';

@Component({
  selector: 'app-quicksort-input',
  templateUrl: '../sort-input/sort-input.component.html',
  styleUrls: ['../sort-input/sort-input.component.css']
})
export class QuicksortInputComponent extends SortInputComponent implements OnInit {

  ngOnInit() {
    this.sortAlgo = new Quicksort();
    this.create();
  }

}
