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
import * as d3 from 'd3';
import * as simpleStats from 'simple-statistics';
import RBush from 'rbush';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';


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
  /** Map of transparency values */
  @Input() transparencies = new Map<string, number>();
  /** Initial transparency */
  @Input() initialTransparency = 100;

  /** Whether reset map position and zoom is enabled */
  @Input() resetEnabled = false;
  /** List of flyable location */
  @Input() flyableLocations: Location[] = [];

  /** List of results to be displayed  */
  @Input() results: string[] = [];


  @Input() cellSize = 0.5;
  @Input() aggregateProperty = 'mean_spatial_distance_5min';

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
    this.transparencies.forEach((value: number, name: string) => {
      console.log(`> ${name}, ${value}`);
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

          const processedGeojson = JSON.parse(this.preprocessHexagonData(JSON.parse(geojsonData), this.cellSize));
          // console.log(`processedGeojson ${JSON.stringify(processedGeojson)}`);

          // Add source
          this.map.addSource(name, {
              type: 'geojson',
              data: processedGeojson
            }
          );

          // Download styling for result
          // this.http.get(baseUrl + name + '.json', {responseType: 'text' as 'json'}).subscribe((layerData: any) => {

          const colorRamp2 = ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177'];

          const colorRamp = [
            'rgb(150, 0, 132)',
            'rgb(236, 107, 11)',
            'rgb(246, 155, 31)',
            'rgb(249, 168, 37)',
            'rgb(199, 159, 51)',
            'rgb(137, 147, 69)',
            'rgb(125, 145, 72)',
            'rgb(12, 123, 104)'
          ];

          console.log(`stops ${JSON.stringify(colorRamp.map((d, i) => [i, d]))}`);

          // Link layer to source
          // const layer = JSON.parse(layerData);
          const layer = {
            id: 'crashesHexGrid',
            type: 'fill',
            source: name,
            layout: {},
            paint: {
              'fill-color': {
                property: 'avg',
                stops: colorRamp.map((d, i) => [i * 200, d])
              },
              'fill-opacity': 0.6
            }
          };
          layer['id'] = name + '-layer';
          layer['source'] = name;


          // Add layer
          // @ts-ignore
          this.map.addLayer(layer);

          // Initialize layer transparency
          if (layer['paint'].hasOwnProperty('fill-color')) {
            this.map.setPaintProperty(layer['id'], 'fill-opacity', this.initialTransparency / 100);
          }
          if (layer['paint'].hasOwnProperty('line-color')) {
            this.map.setPaintProperty(layer['id'], 'line-opacity', this.initialTransparency / 100);
          }
          if (layer['paint'].hasOwnProperty('heatmap-color')) {
            this.map.setPaintProperty(layer['id'], 'heatmap-opacity', this.initialTransparency / 100);
          }
          if (layer['paint'].hasOwnProperty('circle-color')) {
            this.map.setPaintProperty(layer['id'], 'circle-opacity', this.initialTransparency / 100);
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
          // });
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
    const initialLocation = new Location('init', this.zoom, this.center.longitude, this.center.latitude);
    this.flyableLocationSubject.next(initialLocation);
  }

  //
  // Hexagon helpers
  //

  /**
   *
   * @param data
   */
  private preprocessHexagonData(data: any, cellSize: number): string {

    // console.log(`data ${JSON.stringify(data)}`);

    const cellSize = ;
    const options = {};
    const hexGrid = turf.hexGrid([13.088345, 52.3382448, 13.7611609, 52.6755087], cellSize, options);

    // console.log(`hexGrid ${JSON.stringify(hexGrid)}`);

    // perform a "spatial join" on our hexGrid geometry and our crashes point data
    const collected = this.collect(hexGrid, data, this.aggregateProperty, 'values');

    // Debug
    console.log(`collected A ${JSON.stringify(collected)}`);
    collected.features.forEach(f => {
      console.log(`values ${JSON.stringify(f['properties']['values'])}`);
    });

    // get rid of polygons with no joined data, to reduce our final output file size
    collected.features = collected.features.filter(d => d.properties.values.length);

    // Debug
    // console.log(`collected B ${JSON.stringify(collected)}`);

    // count the number of crashes per hexbin
    // @ts-ignore
    turfMeta.propEach(collected, props => {
      props.count = props.values.reduce((acc, cur) => acc += 1, 0);

      const sum = props.values.reduce((a, b) => a + b, 0);
      props.avg = (sum / props.values.length) || 0;
      console.log(`props.avg ${props.avg}`);
    });

    // reduce our count values to a new array of numbers
    // @ts-ignore
    const reduced = turfMeta.featureReduce(collected, (acc, cur) => {
      acc.push(cur.properties.count);
      return acc;
    }, []);

    console.log(`reduced ${JSON.stringify(reduced)}`);

    // compute the ckMeans binning for data into 7 classes from reduced values
    const ck = simpleStats.ckmeans(reduced, 7);

    console.log(`ck.length ${JSON.stringify(ck).length}`);
    console.log(`ck ${JSON.stringify(ck)}`);

    // tack on the bin number to our data, as well as its min and max values
    // @ts-ignore
    turfMeta.propEach(collected, props => {
      ck.forEach((bin, index) => {
        if (bin.indexOf(props.count) > -1) {
          props.bin = index;
          props.binVal = d3.extent(bin);
        }
      });
    });

    // remove the "values" property from our hexBins as it's no longer needed
    // @ts-ignore
    turfMeta.propEach(collected, props => {
      delete props.values;
    });

    return JSON.stringify(collected);
  }

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

    const newFeatures = [];

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

      newFeatures.push(poly);
    });

    return polygons;
  }
}
