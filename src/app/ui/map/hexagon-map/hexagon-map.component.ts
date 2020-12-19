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

import * as turf from '@turf/turf';
import * as turfMeta from '@turf/meta';
import RBush from 'rbush';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import {BoundingBox} from '../model/bounding-box.model';
import {ColorRamp} from '../model/color-ramp.model';


/**
 * Displays a hexagon map box
 */
@Component({
  selector: 'app-hexagon-map',
  templateUrl: './hexagon-map.component.html',
  styleUrls: ['./hexagon-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HexagonMapComponent implements OnChanges, AfterViewInit {

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

  /** List of markers to be displayed */
  @Input() markers: Location[] = [];
  /** List of clickable markers to be displayed */
  @Input() clickableMarkers: Location[] = [];

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
  /** Map of opacity values */
  @Input() opacities = new Map<string, number>();
  /** Initial opacity */
  @Input() initialOpacity = 100;

  /** Whether reset map position and zoom is enabled */
  @Input() resetEnabled = false;
  /** List of flyable location */
  @Input() flyableLocations: Location[] = [];

  /** List of results to be displayed  */
  @Input() results: string[] = [];

  /** Hexagon edge size in km */
  @Input() cellSize = 0.5;
  /** Property to use aggregate data from */
  @Input() aggregateProperty = 'mean_spatial_distance_15min';

  /** Map Box object */
  private map: mapboxgl.Map;

  /** Internal subject that publishes opacity events */
  private opacitySubject = new Subject<{ name: string, value: number }>();
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
      this.opacitySubject.next({name, value});
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

        // Download geojson for result
        this.http.get(baseUrl + name + '.geojson', {responseType: 'text' as 'json'}).subscribe((geojsonData: any) => {

          const processedGeojson = this.preprocessHexagonData(JSON.parse(geojsonData), this.aggregateProperty, this.cellSize);

          // Add source
          this.map.addSource(name, {
              type: 'geojson',
              data: processedGeojson
            }
          );

          // Download styling for result
          // this.http.get(baseUrl + name + '-hexa.json', {responseType: 'text' as 'json'}).subscribe((layerData: any) => {

          const colorRamp = ColorRamp.LUFTDATEN_COLOR_RAMP;

          // Link layer to source
          const layer = {
            id: '',
            type: 'fill',
            source: name,
            paint: {
              'fill-color': {
                property: 'avg',
                stops: colorRamp.map((d, i) => [2000 + (i * 450), d])
              },
              'fill-opacity': 0.6
            }
          };
          layer['id'] = name + '-layer';
          layer['source'] = name;


          // Add layer
          // @ts-ignore
          this.map.addLayer(layer);

          // Initialize layer opacity
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

          // Update layer opacity
          this.opacitySubject.subscribe((e: { name, value }) => {
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
          // });
        });
      });
    });
  }

  //
  // Actions
  //

  /**
   * Handles opacity changes
   * @param name result name
   * @param event slider event
   */
  onOpacityChanged(name: string, event: MatSliderChange) {
    if (this.parametrizeOpacityEnabled) {
      this.opacitySubject.next({name, value: event.value});
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
    const initialLocation = new Location('init', this.zoom, this.center.longitude, this.center.latitude);
    this.flyableLocationSubject.next(initialLocation);
  }

  //
  // Hexagon helpers
  //


  /**
   * Pre-processes raw data by clustering them into hexbins
   * @param data raw data
   * @param aggregateProperty property
   * @param cellSize cell size in km
   *
   * @return a geoJSON that represents polygons for each hexbin
   */
  private preprocessHexagonData(data: any, aggregateProperty: string, cellSize: number): any {

    // @ts-ignore
    const hexGrid = turf.hexGrid(BoundingBox.BERLIN, cellSize);

    // perform a "spatial join" on our hexGrid geometry and our crashes point data
    const collected = this.collect(hexGrid, data, aggregateProperty, 'values');

    // get rid of polygons with no joined data, to reduce our final output file size
    collected.features = collected.features.filter(d => d.properties.values.length);

    // Count number of values and average per hexbin
    turfMeta.propEach(collected, props => {
      props.count = props.values.reduce((acc, cur) => acc += 1, 0);

      const sum = props.values.reduce((a, b) => a + b, 0);
      props.avg = (sum / props.values.length) || 0;
    });

    // remove the "values" property from our hexBins as it's no longer needed
    turfMeta.propEach(collected, props => {
      delete props.values;
    });

    return collected;
  }

  /**
   * Assigns all point into a hexbin polygon
   * @param polygons hexagon polygons
   * @param points points
   * @param inProperty in-property
   * @param outProperty out-property
   */
  private collect(polygons, points, inProperty, outProperty) {
    const rtree = new RBush(6);

    const treeItems = points.features.map((item) => {
      return {
        minX: item.geometry.coordinates[0],
        minY: item.geometry.coordinates[1],
        maxX: item.geometry.coordinates[0],
        maxY: item.geometry.coordinates[1],
        property: item.properties[inProperty]
      };
    });

    rtree.load(treeItems);

    polygons.features.forEach((poly) => {

      if (!poly.properties) {
        poly.properties = {};
      }
      const bbox = turf.bbox(poly);
      const potentialPoints = rtree.search({minX: bbox[0], minY: bbox[1], maxX: bbox[2], maxY: bbox[3]});
      const values = [];
      potentialPoints.forEach((pt) => {
        // @ts-ignore
        if (booleanPointInPolygon([pt.minX, pt.minY], poly)) {
          // @ts-ignore
          values.push(pt.property);
        }
      });

      const properties = {};
      properties[outProperty] = values;
      poly.properties = properties;
    });

    return polygons;
  }
}
