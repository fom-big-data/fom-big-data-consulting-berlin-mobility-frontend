import {Component, Input, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Place} from '../../core/mapbox/model/place.model';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';

/**
 * Displays a map box
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() height = 150;

  @Input() style = MapBoxStyle.STREETS_V11;
  @Input() zoom = 10;
  @Input() center = Place.BRANDENBURG_GATE;

  @Input() navigationEnabled = false;

  map: mapboxgl.Map;

  //
  // Lifecycle hooks
  //

  /**
   * Lifecycle phase
   */
  ngOnInit() {
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.center[0], this.center[1]]
    });

    if (this.navigationEnabled) {
      this.map.addControl(new mapboxgl.NavigationControl());
    }
  }
}
