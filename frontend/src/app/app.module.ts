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
import { KnapsackInputComponent } from './knapsack-input/knapsack-input.component';
import { InputDirective } from './input.directive';
import { BinarySearchTreeComponent } from './binary-search-tree/binary-search-tree.component';
import { RenderComponent } from './render/render.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AlgoCardComponent,
    PlayerComponent,
    InputComponent,
    KnapsackInputComponent,
    InputDirective,
    BinarySearchTreeComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [ KnapsackInputComponent, BinarySearchTreeComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
