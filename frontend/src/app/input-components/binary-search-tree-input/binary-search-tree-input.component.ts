import { Component, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/input/input.component';
import { BinarySearchTreeAlgorithm } from 'src/algorithms/binary-search-tree-algorithm';
import { Options } from 'src/app/Options';

@Component({
  selector: 'app-binary-search-tree-input',
  templateUrl: './binary-search-tree-input.component.html',
  styleUrls: ['./binary-search-tree-input.component.css']
})
export class BinarySearchTreeInputComponent extends InputComponent implements OnInit {
  createValues = '5,6';
  searchValue = 5;
  insertValues = '7,4';

  bst: BinarySearchTreeAlgorithm;


  ngOnInit() {
    this.loadAlgorithm();
  }

  loadAlgorithm() {
    this.bst = new BinarySearchTreeAlgorithm();
    this.sendFunction(() => this.bst.create(this.parse(this.createValues))
      , { autoplay: false, skip: true, delete: true });
  }

  create() {
    this.sendFunction(() => this.bst.create(this.parse(this.createValues))
      , { autoplay: true, skip: false, delete: true });
  }

  insert() {
    const fn = () => {
      const values = this.parse(this.insertValues);
      for (const val of values) {
        this.bst.insert(val);
      }
    };

    this.sendFunction(fn, { autoplay: true, skip: false, delete: false });
  }

  search() {
    const fn = () => this.bst.search(+this.searchValue);
    this.sendFunction(fn, { autoplay: true, skip: false, delete: false });
  }

  sendFunction(fn: () => any, options: Options) {
    this.bst.setOperation(fn, options.delete);
    this.loadAlgorithmContext(this.bst, options);
  }

  parse = (str: string) => str.split(',').map(num => +num);
}
