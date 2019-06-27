import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'algorithms/:algo/play', component: PlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
