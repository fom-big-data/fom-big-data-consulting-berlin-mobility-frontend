import {Component, OnInit} from '@angular/core';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../core/mapbox/model/place.model';

declare var ol: any;

/**
 * Displays an Open Street Story
 */
@Component({
  selector: 'data-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})

export class StoryComponent implements OnInit {

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing place */
  placeEnum = Place;

  ngOnInit() {
  }

  private initializeStory() {
  }
}
