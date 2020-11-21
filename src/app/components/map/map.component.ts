import {AfterViewInit, Component, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Place} from '../../core/mapbox/model/place.model';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Location} from '../../core/mapbox/model/location.model';
import {UUID} from '../../core/entity/model/uuid';
import {HttpClient} from '@angular/common/http';

/**
 * Displays a map box
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  /** Unique ID for this map */
  @Input() id = UUID.toString();
  /** Height of the map */
  @Input() height = '100px';

  /** Render style for Map */
  @Input() style = MapBoxStyle.STREETS_V11;
  /** Zoom factor */
  @Input() zoom = 10;
  /** Initial center of map */
  @Input() center: Location = Place.BRANDENBURG_GATE;
  /** List of markers to be displayed */
  @Input() markers: Location[] = [];
  /** List of clickable markers to be displayed */
  @Input() clickableMarkers: Location[] = [];
  /** Whether navigation control is enabled or not */
  @Input() navigationControlEnabled = false;
  /** Whether map scroll zoom is enabled or not */
  @Input() mapScrollZoomEnabled = true;
  /** Whether full screen control is enabled or not */
  @Input() fullScreenControlEnabled = false;
  /** Whether interactive mode is enabled or not */
  @Input() interactiveEnabled = true;

  /** List of all results to be displayed  */
  @Input() results = [];

  /** Map Box object */
  map: mapboxgl.Map;

  /**
   * Constructor
   * @param http http client
   */
  constructor(private http: HttpClient) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    this.initializeMapBox();

    // Initialize markers
    this.initializeMarkers(this.markers);
    this.initializeClickableMarkers(this.clickableMarkers);

    // Initialize controls
    this.initializeNavigationControl(this.navigationControlEnabled);
    this.initializeScrollZoomControl(this.mapScrollZoomEnabled);
    this.initializeFullScreenControl(this.fullScreenControlEnabled);

    // Display overlays
    this.initializeResultOverlays(this.results);
  }

  //
  // Helpers
  //

  /**
   * Initializes Map Box
   */
  private initializeMapBox() {
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: this.id,
      style: this.style,
      zoom: this.zoom,
      center: [this.center.longitude, this.center.latitude],
      interactive: this.interactiveEnabled
    });
  }

  /**
   * Initializes markers
   * @param markers markers
   */
  private initializeMarkers(markers: Location[]) {
    markers.forEach(marker => {
      new mapboxgl.Marker()
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(this.map);
    });
  }

  /**
   * Initializes clickable markers that will center the viewport on click
   * @param clickableMarkers clickable markers
   */
  private initializeClickableMarkers(clickableMarkers: Location[]) {
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
              features: clickableMarkers.map(marker => {
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

          // Handle click event
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
        });
    });
  }

  /**
   * Initializes navigation control
   * @param navigationControlEnabled whether navigation control is enabled
   */
  private initializeNavigationControl(navigationControlEnabled: boolean) {
    if (navigationControlEnabled) {
      this.map.addControl(new mapboxgl.NavigationControl());
    }
  }

  /**
   * Initializes scroll zoom control
   *
   * @param mapScrollZoomEnabled whether map scroll zoom should be enabled
   */
  private initializeScrollZoomControl(mapScrollZoomEnabled: boolean) {
    if (!mapScrollZoomEnabled) {
      this.map.scrollZoom.disable();
    }
  }

  /**
   * Initializes fullscreen control
   *
   * @param fullScreenControlEnabled whether full screen control should be enabled
   */
  private initializeFullScreenControl(fullScreenControlEnabled: boolean) {
    if (fullScreenControlEnabled) {
      this.map.addControl(new mapboxgl.FullscreenControl());
    }
  }

  /**
   * Initializes results overlays
   */
  private initializeResultOverlays(results: string[]) {
    this.map.on('load', () => {

      // Base URL for results
      const baseUrl = environment.github.resultsUrl;

      results.forEach(name => {
        this.map.addSource(name,
          {
            type: 'geojson',
            data: baseUrl + name + '.geojson'
          }
        );

        this.http.get(baseUrl + name + '.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {
          const style = JSON.parse(data);
          style['source'] = name;

          this.map.addLayer(style);
        });
      });
    });
  }
}
