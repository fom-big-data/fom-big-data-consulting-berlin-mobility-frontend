import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoryComponent} from './pages/story/story.component';
import {ExperimentsComponent} from './pages/experiments/experiments.component';

const routes: Routes = [
  {path: 'experiments', component: ExperimentsComponent},
  {path: '', component: StoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {
}
