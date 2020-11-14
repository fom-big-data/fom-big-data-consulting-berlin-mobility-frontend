import {AfterViewInit, Component, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Place} from '../../core/mapbox/model/place.model';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Location} from '../../core/mapbox/model/location.model';

/**
 * Displays a map box
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() id = 'map';
  @Input() height = 150;

  @Input() style = MapBoxStyle.STREETS_V11;
  @Input() zoom = 10;
  @Input() center: Location = Place.BRANDENBURG_GATE;
  @Input() markers: Location[] = [];
  @Input() navigationEnabled = false;

  map: mapboxgl.Map;

  //
  // Lifecycle hooks
  //

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: this.id,
      style: this.style,
      zoom: this.zoom,
      center: [this.center.longitude, this.center.latitude]
    });

    // Add navigation
    if (this.navigationEnabled) {
      this.map.addControl(new mapboxgl.NavigationControl());
    }

    // Add markers
    this.markers.forEach(marker => {
      new mapboxgl.Marker()
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(this.map);
    });
  }
}
