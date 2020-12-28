import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoryRoutingModule} from './story-routing.module';
import {StoryComponent} from './pages/story/story.component';
import {TextComponent} from './components/text/text.component';
import {PlaceholderComponent} from './components/placeholder/placeholder.component';
import {MapModule} from '../../ui/map/map.module';
import {SectionComponent} from './components/section/section.component';
import {MarkdownFragmentModule} from '../../ui/markdown-fragment/markdown-fragment.module';
import {SectionHeaderComponent} from './components/section-header/section-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FooterComponent} from './components/footer/footer.component';
import {InViewportModule} from 'ng-in-viewport';
import {MatCardModule} from '@angular/material/card';
import {LandingOverlayComponent} from './components/landing-overlay/landing-overlay.component';
import {ExperimentsComponent} from './pages/experiments/experiments.component';
import {SpeedGraphComponent} from './components/speed-graph/speed-graph.component';
import { QuoteComponent } from './components/quote/quote.component';


@NgModule({
  declarations: [
    ExperimentsComponent,
    FooterComponent,
    PlaceholderComponent,
    StoryComponent,
    TextComponent,
    SectionComponent,
    SectionHeaderComponent,
    LandingOverlayComponent,
    SpeedGraphComponent,
    QuoteComponent
  ], imports: [
    CommonModule,
    StoryRoutingModule,
    MapModule,
    MarkdownFragmentModule,

    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,

    MatCardModule,

    InViewportModule
  ]
})
export class StoryModule {
}
