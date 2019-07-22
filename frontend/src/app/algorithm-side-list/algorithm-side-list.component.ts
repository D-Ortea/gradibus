import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlgorithmService } from '../algorithm.service';
import { RenderService } from '../render.service';

@Component({
  selector: 'app-algorithm-side-list',
  templateUrl: './algorithm-side-list.component.html',
  styleUrls: ['./algorithm-side-list.component.css']
})
export class AlgorithmSideListComponent implements OnInit {

  @Input() modeSelected = 'play';
  @Output() changeAlgo = new EventEmitter();

  filteredCategories = Array.from(this.algorithmService.categories);
  categoriesFolded: { name: string, folded: boolean }[] = [];
  searchTerm: string;

  constructor(
    private algorithmService: AlgorithmService,
    private renderService: RenderService
  ) { }

  ngOnInit() {
    this.filteredCategories
      .forEach(category => this.categoriesFolded
        .push({ name: category.name, folded: true }));
  }

  fold(index: number) {
    this.categoriesFolded[index].folded = !this.categoriesFolded[index].folded;
  }

  filter() {
    const term = this.searchTerm.toLowerCase();
    const categories = Array.from(this.algorithmService.categories);

    const includesTerm = name => name.toLowerCase().includes(term);

    this.filteredCategories = categories.map(category => {
      return includesTerm(category.name) ? category : {
        name: category.name,
        algorithms: category.algorithms.filter(algo => includesTerm(algo.name))
      };
    }).filter(category => category.algorithms.length > 0);
  }
}
