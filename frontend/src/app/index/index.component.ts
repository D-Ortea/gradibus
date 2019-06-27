import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from '../algorithm.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  tags =  [...new Set(this.algoService.algorithms.reduce((acc, algo) => acc = [...acc, ...algo.tags], []))];
  tagFilters = [];
  searchTerm = '';
  tagsVisible = false;

  filteredAlgorithms = Array.from(this.algoService.algorithms);

  constructor(
    private algoService: AlgorithmService
  ) { }

  ngOnInit() {
  }

  focusSearchBar(searchBar: HTMLDivElement) {
    searchBar.style.boxShadow = '0 1px 6px 0 rgba(32,33,36,0.28)';
  }

  blurSearchBar(searchBar: HTMLDivElement) {
    searchBar.style.boxShadow = '';
  }

  addFilter(tagText: string) {
    if (this.tagFilters.includes(tagText)) { return; }

    this.tagFilters = [...this.tagFilters, tagText];
    this.filter();
  }

  removeFilter(tagText: string) {
    this.tagFilters = this.tagFilters.filter(tag => tag !== tagText);
    this.filter();
  }

  filter() {
    const term = this.searchTerm.toLowerCase();
    const algorithms = this.algoService.getAlgorithms();

    const includesTerm = name => name.toLowerCase().includes(term);
    const tagsIncludeTerm = el => el.tags.reduce(
      (acc: boolean, tag: string) => acc = acc || includesTerm(tag), false);

    const applyTagFilters = el => this.tagFilters
      .find(tag => el.tags.includes(tag)) || this.tagFilters.length === 0;

    this.filteredAlgorithms = algorithms.filter(el => includesTerm(el.name) 
      || tagsIncludeTerm(el)).filter(el => applyTagFilters(el));
  }

  showTags() {
    this.tagsVisible = !this.tagsVisible;
  }

}
