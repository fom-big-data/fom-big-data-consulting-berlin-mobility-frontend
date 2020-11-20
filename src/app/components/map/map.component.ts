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
  @Input() height = '100px';

  @Input() style = MapBoxStyle.STREETS_V11;
  @Input() zoom = 10;
  @Input() center: Location = Place.BRANDENBURG_GATE;
  @Input() markers: Location[] = [];
  @Input() clickableMarkers: Location[] = [];
  @Input() navigationEnabled = false;
  @Input() centerOnClickedEnabled = true;
  @Input() mapScrollZoomEnabled = true;
  @Input() fullScreenControlEnabled = false;
  @Input() interactiveEnabled = true;

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
      center: [this.center.longitude, this.center.latitude],
      interactive: this.interactiveEnabled
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

    // Add center on click
    if (this.centerOnClickedEnabled) {

      this.map.on('load', () => {
        this.map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          (error, image) => {
            if (error) {
              throw error;
            }
            this.map.addImage('custom-marker', image);
            this.map.addSource('points', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: this.clickableMarkers.map(marker => {
                  return {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: [
                        marker.longitude,
                        marker.latitude
                      ]
                    }
                  };
                })
              }
            });
            this.map.addLayer({
              id: 'symbols',
              type: 'symbol',
              source: 'points',
              layout: {
                'icon-image': 'custom-marker'
              }
            });
            // START ##NOT FUNCTIONAL##
            // add source and layer for inhabitants
            // this.map.addSource('inhabitants', {
            //  type: 'geojson',
            //  });
            // this.map.addLayer({
            //  id: 'inhabitants',
            //  type: 'point',
            //  source: 'inhabitants',
            //  layout: {
            // make layer visible by default
            //  visibility: 'visible',
            //  },
            // });
            // END ##NOT FUNCTIONAL##
            this.map.addSource('Testpoints', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                {
              // feature for Mapbox Berlin near ARD-Hauptstadtstudio
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [ 52.518697, 13.380343 ]
                },
                properties: {
                  title: 'Mapbox Berlin TestPoint1'
                }
                },
              {
              // feature for TestPoint2 unknown location
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [52.6, 13.38]
                },
                properties: {
                title: 'Mapbox Berlin TestPoint2'
                }
              }
              ]
              }
              });
               
              // Add a symbol layer
              this.map.addLayer({
              id: 'points',
              type: 'symbol',
              source: 'Testpoints',
              layout: {
                'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': [
                'TestPoint near ARD-Hauptstadtstudio',
                'TestPoint2 unknown location'
                ],
                'text-offset': [0, 1.25],
                'text-anchor': 'top'
              }
              });
          });
      });

      this.map.on('click', 'symbols', e => {
        this.map.flyTo({
          // @ts-ignore
          center: e.features[0].geometry.coordinates
        });
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      this.map.on('mouseenter', 'symbols', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'symbols', () => {
        this.map.getCanvas().style.cursor = '';
      });
    }

    // Add  scroll zoom control
    if (!this.mapScrollZoomEnabled) {
      this.map.scrollZoom.disable();
    }

    // Add fullscreen control
    if (this.fullScreenControlEnabled) {
      this.map.addControl(new mapboxgl.FullscreenControl());
    }
  }
}
