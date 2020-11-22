import {Component, Input, OnInit} from '@angular/core';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../core/mapbox/model/place.model';

/**
 * Displays an Open Street Story
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})

export class StoryComponent implements OnInit {

  /** Map of all geojsons */
  @Input() geojsons = new Map<string, any>();

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing place */
  placeEnum = Place;

  ngOnInit() {
  }

  private initializeStory() {
  }
}
