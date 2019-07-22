import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AlgoCardComponent } from './algo-card/algo-card.component';
import { PlayerComponent } from './player/player.component';
import { InputComponent } from './input/input.component';
import { KnapsackInputComponent } from './input-components/knapsack-input/knapsack-input.component';
import { InputDirective } from './input.directive';
import { RenderComponent } from './render/render.component';
import { BinarySearchTreeInputComponent } from './input-components/binary-search-tree-input/binary-search-tree-input.component';
import { BubbleSortInputComponent } from './input-components/bubble-sort/bubble-sort-input.component';
import { SelectionSortInputComponent } from './input-components/selection-sort-input/selection-sort-input.component';
import { InsertionSortInputComponent } from './input-components/insertion-sort-input/insertion-sort-input.component';
import { SortInputComponent } from './input-components/sort-input/sort-input.component';
import { MergeSortInputComponent } from './input-components/merge-sort-input/merge-sort-input.component';
import { QuicksortInputComponent } from './input-components/quicksort-input/quicksort-input.component';
import { ModeComponent } from './mode/mode.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlgorithmSideListComponent } from './algorithm-side-list/algorithm-side-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AlgoCardComponent,
    PlayerComponent,
    InputComponent,
    KnapsackInputComponent,
    InputDirective,
    RenderComponent,
    BinarySearchTreeInputComponent,
    BubbleSortInputComponent,
    SelectionSortInputComponent,
    InsertionSortInputComponent,
    SortInputComponent,
    MergeSortInputComponent,
    QuicksortInputComponent,
    ModeComponent,
    TutorialComponent,
    AssessmentComponent,
    PageNotFoundComponent,
    AlgorithmSideListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [
    KnapsackInputComponent,
    BinarySearchTreeInputComponent,
    BubbleSortInputComponent,
    InsertionSortInputComponent,
    SelectionSortInputComponent,
    MergeSortInputComponent,
    QuicksortInputComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
