import {Component, OnInit} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Place} from '../../core/mapbox/model/place.model';

/**
 * Displays a map box
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  style = 'mapbox://styles/mapbox/streets-v11';
  lng = Place.BRANDENBURG_GATE[0];
  lat = Place.BRANDENBURG_GATE[1];

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
      zoom: 10,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
