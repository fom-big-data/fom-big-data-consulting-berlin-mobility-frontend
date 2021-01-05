import {AfterViewInit, Component, ElementRef, Input, isDevMode, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {SectionHeaderComponent} from '../../components/section-header/section-header.component';
import {ViewportScroller} from '@angular/common';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatToolbar} from '@angular/material/toolbar';
import {Place} from '../../../../core/mapbox/model/place.model';
import {Location} from '../../../../core/mapbox/model/location.model';
import {ColorRamp} from '../../../../ui/map/model/color-ramp.model';
import {BoundingBox} from '../../../../ui/map/model/bounding-box.model';

/**
 * Represents a section
 */
export interface Section {

  /** Chapters contained in this sections */
  chapters: string[];
  /** Layers contained in this sections */
  layers: string[];
  /** Place to fly to when section in displayed */
  flyToLocation: Location;
}

/**
 * Displays a story
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Map of all geojsons */
  @Input() geojsons = new Map<string, any>();

  /** Toolbar component */
  @ViewChild(MatToolbar, {read: ElementRef}) toolbar: ElementRef;
  /** List of section header components */
  @ViewChildren(SectionHeaderComponent) sectionHeaders: QueryList<SectionHeaderComponent>;

  /** Whether or not the toolbar should be sticky */
  toolbarSticky = false;
  /** Height of the map */
  mapHeight = '60vh';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing bounding boxes */
  boundingBoxEnum = BoundingBox;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing color ramp */
  colorRampEnum = ColorRamp;

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /** Sections to be displayed in story container 'visibility-walk' */
  sectionsVisibilityWalk: Section[] = [];
  /** Sections to be displayed in story container 'visibility-transport' */
  sectionsVisibilityTransport: Section[] = [];
  /** Sections to be displayed in story container 'problems' */
  sectionsProblems: Section[] = [];
  /** Sections to be displayed in story container 'whitespots' */
  sectionsWhitespot: Section[] = [];

  /** Results to be displayed in story container 'visibility-walk' */
  resultsVisibilityWalk: string[] = [];
  /** Results to be displayed in story container 'visibility-transport' */
  resultsVisibilityTransport: string[] = [];
  /** Results to be displayed in story container 'problems' */
  resultsProblems: string[] = [];

  /** Opacities for map named 'understanding' */
  opacitiesUnderstanding = new Map<string, number>();
  /** Opacities for map named 'visibility-walk' */
  opacitiesVisibilityWalk = new Map<string, number>();
  /** Opacities for map named 'visibility-transport' */
  opacitiesVisibilityTransport = new Map<string, number>();
  /** Opacities for map named 'problems' */
  opacitiesProblems = new Map<string, number>();

  /** Markers for map named 'understanding' */
  popupMarkersUnderstanding = [];

  /** Fly-to location for map named 'whitespots' */
  flyToLocationWhitespots: Location;
  /** Fly-to bounding box for map named 'whitespots' */
  flyToBoundingBoxWhitespots: BoundingBox;

  /** True if app is started in dev mode */
  isDev = isDevMode();

  /**
   * Constructor
   * @param viewportScroller viewport scroller
   * @param http http client
   */
  constructor(private viewportScroller: ViewportScroller, private http: HttpClient) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeStoryVisibility();
    this.initializeStoryProblems();
    this.initializeStoryWhitespots();
  }

  /**
   * Handles after-view-init lifecycle phase
   */
  ngAfterViewInit() {
    const toolbarOffsetTop = this.toolbar.nativeElement.offsetTop;
    const headerTopRowHeight = 30;

    // Subscribe scroll events
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((e: Event) => {

        // Make toolbar sticky if user scrolled far enough
        this.toolbarSticky = window.scrollY > toolbarOffsetTop - headerTopRowHeight;
      });
  }

  /**
   * Handles on-destroy lifecycle phase
   */
  ngOnDestroy() {
    this.unsubscribeSubject.next();
  }

  //
  // Initialization
  //

  /**
   * Initializes story named 'visibility'
   */
  private initializeStoryVisibility() {
    this.sectionsVisibilityWalk = [];
    [...Array(29)].forEach((_, index) => {
      this.sectionsVisibilityWalk.push({
        chapters: [],
        layers: [`isochrones-walk-${index + 1}-52.5119408-13.3161495`],
        flyToLocation: null
      });
    });
    [...Array(29)].forEach((_, index) => {
      this.sectionsVisibilityTransport.push({
        chapters: [],
        layers: [`isochrones-subway-${index + 1}-52.5119408-13.3161495`],
        flyToLocation: null
      });
    });

    // Aggregate layers to be displayed on map
    this.sectionsVisibilityWalk.forEach(section => {
      this.resultsVisibilityWalk.push(...section.layers);
    });
    this.sectionsVisibilityTransport.forEach(section => {
      this.resultsVisibilityTransport.push(...section.layers);
    });
  }

  /**
   * Initializes story named 'problems'
   */
  private initializeStoryProblems() {
    this.sectionsProblems = [
      {chapters: ['whitespots-bike'], layers: ['isochrones-bike-15'], flyToLocation: null},
      {chapters: ['whitespots-bus'], layers: ['isochrones-bus-15'], flyToLocation: null},
      {chapters: ['whitespots-s-bahn'], layers: ['isochrones-light_rail-15'], flyToLocation: null},
      {chapters: ['whitespots-u-bahn'], layers: ['isochrones-subway-15'], flyToLocation: null},
      {chapters: ['whitespots-tram'], layers: ['isochrones-tram-15'], flyToLocation: null},
      {chapters: ['whitespots-all'], layers: ['isochrones-all-15'], flyToLocation: null},
      {chapters: ['whitespots-all-2'], layers: ['isochrones-all-15'], flyToLocation: null},
      {chapters: ['whitespots-all-3'], layers: ['isochrones-all-15'], flyToLocation: null}
    ];

    this.sectionsProblems.forEach(section => {
      this.resultsProblems.push(...section.layers);
    });
  }

  /**
   * Initializes story named 'whitespots'
   */
  private initializeStoryWhitespots() {
    this.sectionsWhitespot = [
      {chapters: ['whitespots-siemensstadt'], layers: null, flyToLocation: Place.SIEMENSSTADT},
      {chapters: ['whitespots-tegel'], layers: null, flyToLocation: Place.TEGEL},
      {chapters: ['whitespots-westhafen'], layers: null, flyToLocation: Place.WESTHAFEN},
      {chapters: ['whitespots-geweerbegebiet-britz'], layers: null, flyToLocation: Place.GEWERBEGEBIET_BRITZ},
      {chapters: ['whitespots-landsberger-allee'], layers: null, flyToLocation: Place.LANDSBERGER_ALLEE},
      {chapters: ['whitespots-marzahnhellersdorf'], layers: null, flyToLocation: Place.MARZAHN_HELLERSDORF}
    ];

    this.sectionsProblems.forEach(section => {
      this.resultsProblems.push(...section.layers);
    });
  }

  //
  // Actions
  //

  /**
   * Handles layer marker events
   * @param mapName map name to target
   * @param event event
   */
  onLayerMarkerEventTriggered(mapName: string, event: {
    layers: string[],
    popupMarkers: Location[];
    flyToLocation: Location,
    flyToBoundingBox: BoundingBox,
    opacity: number,
    clearOthers: boolean
  }) {
    if (mapName === 'understanding') {
      if (event.clearOthers) {
        this.opacitiesUnderstanding.forEach((value: number, key: string) => {
          this.opacitiesUnderstanding.set(key, 0);
        });
      }

      event.layers.forEach(layer => {
        this.opacitiesUnderstanding.set(layer, event.opacity);
      });
      this.opacitiesUnderstanding = new Map(this.opacitiesUnderstanding);

      this.popupMarkersUnderstanding = event.popupMarkers;
    }

    if (mapName === 'visibility-walk') {
      if (event.clearOthers) {
        this.opacitiesVisibilityWalk.forEach((value: number, key: string) => {
          this.opacitiesVisibilityWalk.set(key, 0);
        });
      }

      event.layers.forEach(layer => {
        this.opacitiesVisibilityWalk.set(layer, event.opacity);
      });
      this.opacitiesVisibilityWalk = new Map(this.opacitiesVisibilityWalk);
    }

    if (mapName === 'visibility-transport') {
      if (event.clearOthers) {
        this.opacitiesVisibilityTransport.forEach((value: number, key: string) => {
          this.opacitiesVisibilityTransport.set(key, 0);
        });
      }

      event.layers.forEach(layer => {
        this.opacitiesVisibilityTransport.set(layer, event.opacity);
      });
      this.opacitiesVisibilityTransport = new Map(this.opacitiesVisibilityTransport);
    }

    if (mapName === 'problems') {
      if (event.clearOthers) {
        this.opacitiesProblems.forEach((value: number, key: string) => {
          this.opacitiesProblems.set(key, 0);
        });
      }

      event.layers.forEach(layer => {
        this.opacitiesProblems.set(layer, event.opacity);
      });
      this.opacitiesProblems = new Map(this.opacitiesProblems);
    }

    if (mapName === 'whitespots') {
      this.flyToLocationWhitespots = event.flyToLocation;
    }

    if (mapName === 'whitespots') {
      this.flyToBoundingBoxWhitespots = event.flyToBoundingBox;
    }
  }

  //
  // Helpers
  //

  /**
   * Scrolls to an element
   * @param anchor anchor
   */
  scrollToElement(anchor): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }
}
