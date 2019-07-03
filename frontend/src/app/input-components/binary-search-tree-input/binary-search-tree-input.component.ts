import { Component, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/input/input.component';
import { BinarySearchTree } from 'src/algorithms/binary-search-tree';
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

  bst: BinarySearchTree;


  ngOnInit() {
    this.loadAlgorithm();
  }

  loadAlgorithm() {
    this.bst = new BinarySearchTree();
    super.sendFunction(this.bst, () => this.bst.create(this.parse(this.createValues))
      , { autoplay: false, skip: true, delete: true });
  }

  create() {
    super.sendFunction(this.bst, () => this.bst.create(this.parse(this.createValues))
      , { autoplay: true, skip: false, delete: true });
  }

  insert() {
    const fn = () => {
      const values = this.parse(this.insertValues);
      for (const val of values) {
        this.bst.insert(val);
      }
    };

    super.sendFunction(this.bst, fn, { autoplay: true, skip: false, delete: false });
  }

  search() {
    const fn = () => this.bst.search(+this.searchValue);
    super.sendFunction(this.bst, fn, { autoplay: true, skip: false, delete: false });
  }

  private parse = (str: string) => str.split(',').map(num => +num);
}
