import { Component, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/input/input.component';
import { BubbleSort } from 'src/algorithms/bubble-sort';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort-input.component.html',
  styleUrls: ['./bubble-sort-input.component.css']
})
export class BubbleSortInputComponent extends InputComponent implements OnInit {

  private values = '3,8,1,3,4,5,6,6,1';
  private bubble: BubbleSort;

  ngOnInit() {
    this.create();
  }

  create(options = { autoplay: false, skip: true, delete: true }) {
    const parse = (str: string) => str.split(',').map(num => +num);
    this.bubble = new BubbleSort();

    super.sendFunction(this.bubble,
      () => this.bubble.create(parse(this.values)), options);
  }

  sort() {
    const options = { autoplay: true, skip: false, delete: true };
    super.sendFunction(this.bubble, this.bubble.sort, options);
  }

}
