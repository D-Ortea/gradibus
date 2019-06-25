import { Component, OnInit } from '@angular/core';

const algorithms = [
  {name: 'Knapsack Problem' ,video: '/assets/algo-videos//knapsack-problem.mp4', 
    tags: ['dynamic programming', 'knapsack']},
  {name: 'Binary Search Tree', video: '/assets/algo-videos//BST.mp4', tags: ['tree','BST', 'search', 'branch and bound']},
  {name: 'Bubble Sort', video: '/assets/algo-videos//bubble-sort.mp4', tags: ['sort', 'brute force']},
  {name: 'Merge Sort', video: '/assets/algo-videos//merge-sort.mp4', tags: ['sort', 'divide and conquer']},
  {name: 'Quicksort', video: '/assets/algo-videos//quicksort.mp4', tags: ['sort', 'divide and conquer']},
  {name: 'Radix Sort', video: '/assets/algo-videos//radix-sort.mp4', tags: ['sort', 'divide and conquer']},
  {name: 'Pidgeonhole Sort', video: '/assets/algo-videos//pidgeonhole-sort.mp4', tags: ['sort', 'divide and conquer']},
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  tags =  [...new Set(algorithms.reduce((acc, algo) => acc = [...acc, ...algo.tags], []))];
  tagFilters = [];
  searchTerm = '';
  tagsVisible = false;

  algoList = Array.from(algorithms);

  constructor() { }

  ngOnInit() {
  }

  focusSearchBar(searchBar) {
    searchBar.style.boxShadow = '0 1px 6px 0 rgba(32,33,36,0.28)';
  }

  blurSearchBar(searchBar) {
    searchBar.style.boxShadow = '';
  }

  filterByTag(tagText: string) {
    if (this.tagFilters.includes(tagText)) { return; }

    this.tagFilters = [...this.tagFilters, tagText];

    this.algoList = this.algoList.filter(el => 
      this.tagFilters.find(tag => el.tags.includes(tag)) 
      || this.tagFilters.length === 0);
  }

  removeFilter(tagText) {
    this.tagFilters = this.tagFilters.filter(tag => tag !== tagText);
    this.algoList = this.findAlgorithms();
  }

  search() {
    this.algoList = this.findAlgorithms();
  }

  findAlgorithms() {
    const term = this.searchTerm.toLowerCase();
    return algorithms.filter(
      el => (el.name.toLowerCase().includes(term)
      || el.tags.reduce(
        (acc: boolean, tag: string) => acc = acc
        || tag.toLowerCase().includes(term), false))
      && (this.tagFilters.find(tag => el.tags.includes(tag))
        || this.tagFilters.length === 0));
  }

  showTags() {
    this.tagsVisible = !this.tagsVisible;
  }

}
