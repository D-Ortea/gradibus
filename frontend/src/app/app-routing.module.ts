import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ModeComponent } from './mode/mode.component';
import { PlayerComponent } from './player/player.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'algorithms/:algo', component: ModeComponent, children: [
      { path: 'play', component: PlayerComponent },
      { path: 'tutorial', component: TutorialComponent },
      { path: 'test', component: AssessmentComponent },
      { path: '', redirectTo: '/play', pathMatch: 'full' }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
