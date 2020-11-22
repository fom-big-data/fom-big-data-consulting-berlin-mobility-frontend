import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoryRoutingModule} from './story-routing.module';
import {StoryComponent} from './story.component';
import {TextComponent} from './components/text/text.component';
import {PlaceholderComponent} from './components/placeholder/placeholder.component';
import {MapModule} from '../../ui/map/map.module';


@NgModule({
  declarations: [
    PlaceholderComponent,
    StoryComponent,
    TextComponent
  ], imports: [
    CommonModule,
    StoryRoutingModule,
    MapModule
  ]
})
export class StoryModule {
}
