import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoryComponent} from './story.component';
import {StoryFixedComponent} from './components/story-fixed/story-fixed.component';

const routes: Routes = [
  {path: 'fixed', component: StoryFixedComponent},
  {path: '', component: StoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {
}
