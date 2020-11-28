import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoryRoutingModule} from './story-routing.module';
import {StoryComponent} from './story.component';
import {TextComponent} from './components/text/text.component';
import {PlaceholderComponent} from './components/placeholder/placeholder.component';
import {MapModule} from '../../ui/map/map.module';
import {SectionComponent} from './components/section/section.component';
import {MarkdownFragmentModule} from '../../ui/markdown-fragment/markdown-fragment.module';
import {SectionHeaderComponent} from './components/section-header/section-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent,
    PlaceholderComponent,
    StoryComponent,
    TextComponent,
    SectionComponent,
    SectionHeaderComponent
  ], imports: [
    CommonModule,
    StoryRoutingModule,
    MapModule,
    MarkdownFragmentModule,

    MatButtonModule,
    MatToolbarModule
  ]
})
export class StoryModule {
}
