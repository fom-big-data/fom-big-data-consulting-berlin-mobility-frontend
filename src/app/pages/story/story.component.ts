import {Component, Directive, Input, QueryList, ViewChildren} from '@angular/core';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../core/mapbox/model/place.model';
import {SectionHeaderComponent} from './components/section-header/section-header.component';
import {ViewportScroller} from '@angular/common';

@Directive({selector: 'app-section-header'})
export class SelectionHeaderDirective {
  @Input() id!: string;
}

/**
 * Displays a story
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  /** Map of all geojsons */
  @Input() geojsons = new Map<string, any>();
  /** List of section headers */
  @ViewChildren(SectionHeaderComponent) sectionHeaders: QueryList<SectionHeaderComponent>;

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing place */
  placeEnum = Place;

  constructor(private viewportScroller: ViewportScroller) {
  }

  scrollToElement(anchor): void {
    console.log(anchor);
    this.viewportScroller.scrollToAnchor(anchor);
  }
}
