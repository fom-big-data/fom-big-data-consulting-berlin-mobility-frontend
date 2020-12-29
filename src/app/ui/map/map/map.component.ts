import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../environments/environment';
import {Place} from '../../../core/mapbox/model/place.model';
import {MapBoxStyle} from '../../../core/mapbox/model/map-box-style.enum';
import {Location} from '../../../core/mapbox/model/location.model';
import {UUID} from '../../../core/entity/model/uuid';
import {HttpClient} from '@angular/common/http';
import {MatSliderChange} from '@angular/material/slider';
import {Subject} from 'rxjs';

/**
 * Displays a map box
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnChanges, AfterViewInit {

  /** Unique ID for this map */
  @Input() id = UUID.toString();
  /** Height of the map */
  @Input() height = '500px';

  /** Render style for Map */
  @Input() style = MapBoxStyle.STREETS_V11;
  /** Zoom factor */
  @Input() zoom = 10;
  /** Initial center of map */
  @Input() center: Location = Place.BRANDENBURG_GATE;
  /** Initial bounding box of map */
  @Input() boundingBox: number[];

  /** List of markers to be displayed */
  @Input() markers: Location[] = [];
  /** List of clickable markers to be displayed */
  @Input() clickableMarkers: Location[] = [];
  /** List of markers with a pop-up to be displayed */
  @Input() popupMarkers: Location[] = [];

  /** Whether interactive mode is enabled or not */
  @Input() interactiveEnabled = true;
  /** Whether navigation control is enabled or not */
  @Input() navigationControlEnabled = false;
  /** Whether full screen control is enabled or not */
  @Input() fullScreenControlEnabled = false;

  /** Whether scroll zoom is enabled or not */
  @Input() scrollZoomEnabled = true;
  /** Whether map zoom is enabled or not */
  @Input() boxZoomEnabled = true;
  /** Whether drag rotate is enabled or not */
  @Input() dragRotateEnabled = true;
  /** Whether drag pan is enabled or not */
  @Input() dragPanEnabled = true;
  /** Whether keyboard is enabled or not */
  @Input() keyboardEnabled = true;
  /** Whether double click zoom is enabled or not */
  @Input() doubleClickZoomEnabled = true;
  /** Whether touch zoom rotate is enabled or not */
  @Input() touchZoomRotateEnabled = true;

  /** Whether opacity should be parametrized or not */
  @Input() parametrizeOpacityEnabled = false;
  /** Map of opacities values */
  @Input() opacities = new Map<string, number>();
  /** Initial opacities */
  @Input() initialOpacity = 100;

  /** Whether reset map position and zoom is enabled */
  @Input() resetEnabled = false;
  /** List of flyable location */
  @Input() flyableLocations: Location[] = [];

  /** List of results to be displayed  */
  @Input() results: string[] = [];

  /** Map Box object */
  private map: mapboxgl.Map;

  /** Internal subject that publishes transparency events */
  private transparencySubject = new Subject<{ name: string, value: number }>();
  /** Internal subject that publishes flyable location events */
  private flyableLocationSubject = new Subject<Location>();

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
   * Handles on-changes phase
   * @param changes changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.opacities.forEach((value: number, name: string) => {
      this.transparencySubject.next({name, value});
    });
  }

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    this.initializeMapBox();

    // Initialize markers
    this.initializeMarkers(this.markers);
    this.initializeClickableMarkers(this.clickableMarkers);
    this.initializePopupMarkers(this.popupMarkers);

    // Initialize controls
    this.initializeNavigationControl(this.navigationControlEnabled);
    this.initializeFullScreenControl(this.fullScreenControlEnabled);

    // Initialize interactivity
    this.initializeScrollZoom(this.scrollZoomEnabled);
    this.initializeBoxZoom(this.boxZoomEnabled);
    this.initializeDragRotate(this.dragRotateEnabled);
    this.initializeDragPan(this.dragPanEnabled);
    this.initializeKeyboard(this.keyboardEnabled);
    this.initializeDoubleClickZoom(this.doubleClickZoomEnabled);
    this.initializeTouchZoomRotate(this.touchZoomRotateEnabled);

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

    if (this.boundingBox != null) {
      // @ts-ignore
      this.map.fitBounds(this.boundingBox);
    }
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
   * Initializes markers that will open a pop-up on click
   * @param popupMarkers pop-up markers
   */
  private initializePopupMarkers(popupMarkers: Location[]) {
    popupMarkers.forEach(marker => {
      // Create the popup
      const popup = new mapboxgl.Popup({offset: 25}).setText(
        marker.description
      );

      // Create DOM element for the marker
      const el = document.createElement('div');
      el.id = `marker-${marker.name.toLowerCase()}`;

      // Create the marker
      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(popup)
        .addTo(this.map);
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
   * Initializes scroll zoom
   * @param scrollZoomEnabled whether scroll zoom should be enabled or not
   */
  private initializeScrollZoom(scrollZoomEnabled: boolean) {
    if (!scrollZoomEnabled) {
      this.map.scrollZoom.disable();
    }
  }

  /**
   * Initializes box zoom
   * @param boxZoomEnabled whether box zoom should be enabled or not
   */
  private initializeBoxZoom(boxZoomEnabled: boolean) {
    if (!boxZoomEnabled) {
      this.map.boxZoom.disable();
    }
  }

  /**
   * Initializes drag rotate
   * @param dragRotateEnabled whether drag rotate should be enabled or not
   */
  private initializeDragRotate(dragRotateEnabled: boolean) {
    if (!dragRotateEnabled) {
      this.map.dragRotate.disable();
    }
  }

  /**
   * Initializes drag pan
   * @param dragPanEnabled whether drag pan should be enabled or not
   */
  private initializeDragPan(dragPanEnabled: boolean) {
    if (!dragPanEnabled) {
      this.map.dragPan.disable();
    }
  }

  /**
   * Initializes keyboard
   * @param keyboardEnabled whether keyboard should be enabled or not
   */
  private initializeKeyboard(keyboardEnabled: boolean) {
    if (!keyboardEnabled) {
      this.map.keyboard.disable();
    }
  }

  /**
   * Initializes double click zoom
   * @param doubleClickZoomEnabled whether double click zoom should be enabled or not
   */
  private initializeDoubleClickZoom(doubleClickZoomEnabled: boolean) {
    if (!doubleClickZoomEnabled) {
      this.map.doubleClickZoom.disable();
    }
  }

  /**
   * Initializes touch zom rotate
   * @param touchZoomRotateEnabled whether touch zoom rotate should be enabled or not
   */
  private initializeTouchZoomRotate(touchZoomRotateEnabled: boolean) {
    if (!touchZoomRotateEnabled) {
      this.map.touchZoomRotate.disable();
    }
  }

  /**
   * Initializes results overlays
   *
   * @param results results
   */
  private initializeResultOverlays(results: string[]) {
    this.map.on('load', () => {

      // Base URL for results
      const baseUrl = environment.github.resultsUrl;

      results.forEach(name => {

        // Add source
        this.map.addSource(name,
          {
            type: 'geojson',
            data: baseUrl + name + '.geojson'
          }
        );

        // Download styling for result
        this.http.get(baseUrl + 'styles/' + name + '.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {

          // Link layer to source
          const layer = JSON.parse(data);
          layer['id'] = name + '-layer';
          layer['source'] = name;

          // Get ID of first layer which contains labels
          const firstSymbolId = this.getFirstLayerWithLabels(this.map);

          // Add layer
          this.map.addLayer(layer, firstSymbolId);

          // Initialize layer transparency
          if (layer['paint'].hasOwnProperty('fill-color')) {
            this.map.setPaintProperty(layer['id'], 'fill-opacity', this.initialOpacity / 100);
          }
          if (layer['paint'].hasOwnProperty('line-color')) {
            this.map.setPaintProperty(layer['id'], 'line-opacity', this.initialOpacity / 100);
          }
          if (layer['paint'].hasOwnProperty('heatmap-color')) {
            this.map.setPaintProperty(layer['id'], 'heatmap-opacity', this.initialOpacity / 100);
          }
          if (layer['paint'].hasOwnProperty('circle-color')) {
            this.map.setPaintProperty(layer['id'], 'circle-opacity', this.initialOpacity / 100);
          }

          // Update layer transparency
          this.transparencySubject.subscribe((e: { name, value }) => {
            const layerId = e.name + '-layer';

            if (layer.id === layerId) {
              if (layer['paint'].hasOwnProperty('fill-color')) {
                this.map.setPaintProperty(layerId, 'fill-opacity', e.value / 100);
              }
              if (layer['paint'].hasOwnProperty('line-color')) {
                this.map.setPaintProperty(layerId, 'line-opacity', e.value / 100);
              }
              if (layer['paint'].hasOwnProperty('heatmap-color')) {
                this.map.setPaintProperty(layerId, 'heatmap-opacity', e.value / 100);
              }
              if (layer['paint'].hasOwnProperty('circle-color')) {
                this.map.setPaintProperty(layerId, 'circle-opacity', e.value / 100);
              }
            }
          });

          this.flyableLocationSubject.subscribe((location: Location) => {
            this.map.flyTo({
              center: [location.longitude, location.latitude],
              zoom: location.zoom ? location.zoom : this.zoom,
              pitch: 0,
              bearing: 0,
              essential: true
            });
          });
        });
      });
    });
  }

  //
  // Actions
  //

  /**
   * Handles transparency changes
   * @param name result name
   * @param event slider event
   */
  onTransparencyChanged(name: string, event: MatSliderChange) {
    if (this.parametrizeOpacityEnabled) {
      this.transparencySubject.next({name, value: event.value});
    }
  }

  /**
   * Handles clicks on flyable-location button
   * @param location location to fly to
   */
  onFlyableLocationClicked(location: Location) {
    this.flyableLocationSubject.next(location);
  }

  /**
   * Handles click on reset button
   */
  onResetClicked() {
    const initialLocation = new Location('init', '', this.zoom, this.center.longitude, this.center.latitude);
    this.flyableLocationSubject.next(initialLocation);
  }

  //
  // Helpers
  //

  /**
   * Gets ID of first layer containing symbols
   * @param map map
   */
  private getFirstLayerWithLabels(map): string {
    const layers = map.getStyle().layers;
    let firstSymbolId = '';
    // Find the index of the first symbol layer in the map style
    layers.forEach((_, index) => {
      if (firstSymbolId === '' && layers[index].type === 'symbol') {
        firstSymbolId = layers[index].id;
      }
    });

    return firstSymbolId;
  }
}
