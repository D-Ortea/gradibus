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
     SelectionSortInputComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
