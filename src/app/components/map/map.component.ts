import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class MapComponent implements AfterViewInit, OnChanges {

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

  /** Map of all results */
  @Input() geojsons = new Map<string, any>();

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

  ngOnChanges(changes: SimpleChanges): void {
    // Add geojson
    if (this.geojsons.size > 0) {
      this.map.on('load', () => {
        this.geojsons.forEach((value: any, name: string) => {

          // Clean geojson
          delete value['crs'];

          this.map.addSource(name,
            {
              type: 'geojson',
              data: JSON.parse(value)
            }
          );

          // Add style for berlin-inhabitants
          // this.map.addLayer({
          //   id: name + '-berlin-inhabitants',
          //   type: 'fill',
          //   source: name,
          //   layout: {},
          //   paint: {
          //     'fill-color': [
          //       'interpolate',
          //       ['linear'],
          //       ['get', 'einwohner'],
          //       5000,
          //       'rgba(255, 255, 255, 0.0)',
          //       40000,
          //       'rgba(255, 100, 50, 0.2)'
          //     ],
          //     'fill-outline-color': [
          //       'interpolate',
          //       ['linear'],
          //       ['get', 'einwohner'],
          //       5000,
          //       'rgba(255, 100, 50, 1.0)',
          //       40000,
          //       'rgba(255, 100, 50, 1.0)'
          //     ]
          //   }
          // });

          // Add style for test-geo-bicycleedges-small
          this.map.addLayer({
            id: name + '-test-geo-bicycleedges-small',
            type: 'line',
            source: name,
            layout: {},
            paint: {
              'line-color': [
                'interpolate',
                ['linear'],
                ['get', 'length'],
                0,
                'rgba(50, 100, 255, 1.0)',
                200000,
                'rgba(50, 100, 255, 1.0)'
              ],
              'line-width': 5
            }
          });
        });
      });
    }
  }
}
