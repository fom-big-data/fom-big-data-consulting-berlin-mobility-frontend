import {Component, Input} from '@angular/core';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../core/mapbox/model/place.model';

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

  /** App title */
  appTitle = 'Berlin Mobility';
  /** App sub-title */
  appSubTitle = 'Nutzung von Daten für die urbane Mobilität von morgen';

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing place */
  placeEnum = Place;
}
