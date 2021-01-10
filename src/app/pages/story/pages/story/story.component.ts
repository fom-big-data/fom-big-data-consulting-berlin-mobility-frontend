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
  layers?: string[];
  /** Pop-up marker names */
  popupMarkers?: Location[];
  /** Place to fly to when section in displayed */
  flyToLocation?: Location;
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
  /** Opacities for map named 'whitespots' */
  opacitiesWhitespots = new Map<string, number>();

  /** Markers for map named 'understanding' */
  popupMarkersUnderstanding = [];
  /** Markers for map named 'whitespots' */
  popupMarkersWhitespots = [];

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
      });
    });
    [...Array(29)].forEach((_, index) => {
      this.sectionsVisibilityTransport.push({
        chapters: [],
        layers: [`isochrones-subway-${index + 1}-52.5119408-13.3161495`],
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
      {chapters: ['whitespots-bike'], layers: ['isochrones-bike-15']},
      {chapters: ['whitespots-bus'], layers: ['isochrones-bus-15']},
      {chapters: ['whitespots-s-bahn'], layers: ['isochrones-light_rail-15']},
      {chapters: ['whitespots-u-bahn'], layers: ['isochrones-subway-15']},
      {chapters: ['whitespots-tram'], layers: ['isochrones-tram-15']},
      {chapters: ['whitespots-all'], layers: ['isochrones-all-15']},
      {chapters: ['whitespots-all-2'], layers: ['isochrones-all-15']},
      {chapters: ['whitespots-all-3'], layers: ['isochrones-all-15']}
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
      {chapters: ['whitespots-spandau'], layers: [], flyToLocation: Place.SPANDAU},
      {chapters: ['whitespots-charlottenburg-nord-1'], layers: [], flyToLocation: Place.CHARLOTTENBURGNORD},
      {chapters: ['whitespots-charlottenburg-nord-2'], layers: [], flyToLocation: Place.CHARLOTTENBURGNORD},
      {
        chapters: ['whitespots-gewerbegebiet-britz-1'],
        layers: ['lines-bus', 'lines-subway', 'lines-light_rail'],
        popupMarkers: [Place.BUS_GERADESTRASSE, Place.BUS_EINTRAGSIEDLUNG, Place.U_ULLSTEINSTRASSE, Place.U_BLASCHKOALLEE,
          Place.S_HERMANNSTRASSE],
        flyToLocation: Place.GEWERBEGEBIET_BRITZ
      },
      {
        chapters: ['whitespots-gewerbegebiet-britz-2'],
        layers: ['lines-bus', 'lines-subway', 'lines-light_rail'],
        popupMarkers: [Place.BUS_GERADESTRASSE, Place.BUS_EINTRAGSIEDLUNG, Place.U_ULLSTEINSTRASSE, Place.U_BLASCHKOALLEE,
          Place.S_HERMANNSTRASSE],
        flyToLocation: Place.GEWERBEGEBIET_BRITZ
      },
      {
        chapters: ['whitespots-landsberger-allee-1'],
        layers: ['lines-tram'],
        popupMarkers: [
          Place.TRAM_ZECHLINER_STRASSE, Place.TRAM_GENSLERSTRASSE, Place.TRAM_ARENDSWEG, Place.TRAM_LANDSBERGER_ALLEE_RHINSTRASSE,
          Place.TRAM_DINGELSTAEDTER_STRASSE, Place.TRAM_MARZAHNER_PROMENADE, Place.TRAM_GEWERBEPARK_GEORG_KNORR,
          Place.TRAM_HERZBERGSTRASSE_INDUSTRIEPARK, Place.TRAM_HERZBERGSTRASSE_SIEGFRIEDSTRASSE, Place.TRAM_EV_KRANKENHAUS_KEH,
          Place.TRAM_ALLEE_DER_KOSMONAUTEN_, Place.TRAM_BEILSTEINER_STRASSE, Place.TRAM_REINHARDSBRUNNER_STRASSE,
          Place.TRAM_MEERANER_STRASSE, Place.TRAM_KLEINGARTENANLAGE_BIELEFELDT],
        flyToLocation: Place.LANDSBERGER_ALLEE_CLOSE
      },
      {
        chapters: ['whitespots-landsberger-allee-2'],
        layers: ['lines-tram', 'lines-subway', 'lines-light_rail'],
        popupMarkers: [Place.S_POELCHAUSTRASSE, Place.S_SPRINGPFUHL, Place.S_LANDSBERGER_ALLEE, Place.S_STORKOWER_STRASSE,
          Place.U_MAGDALENENSTRASSE],
        flyToLocation: Place.LANDSBERGER_ALLEE
      },
      {
        chapters: ['whitespots-marzahnhellersdorf'],
        layers: ['lines-tram', 'lines-bus', 'lines-subway'],
        popupMarkers: [Place.TRAM_AHRENSFELDE, Place.TRAM_HELLERSDORF_U, Place.TRAM_STENDALER,Place.TRAM_STENDALERZOSSENER, Place.TRAM_ZOSSENER,
           Place.TRAM_ALTEHELLERSDORFER,Place.TRAM_MICHENDORFER, Place.TRAM_LANDSBERGERZOSSENER,
           Place.TRAM_BETRIEBSBAHNHOFMARZAHN,  Place.TRAM_BRODOWIENERRING, Place.TRAM_LANDSBERGERBLUMBERGER, Place.U_HELLERSDORF],
        flyToLocation: Place.MARZAHN_HELLERSDORF_CLOSER},
      {
        chapters: ['whitespots-marzahnhellersdorf-1'],
        layers: ['lines-tram', 'lines-bus', 'lines-light_rail', 'lines-subway'],
        popupMarkers: [Place.S_POELCHAUSTRASSE, Place.S_SPRINGPFUHL, Place.U_HELLERSDORF, Place.TRAM_AHRENSFELDE, Place.TRAM_HELLERSDORF_U, Place.TRAM_STENDALER],
        flyToLocation: Place.MARZAHN_HELLERSDORF},
      {
        chapters: ['whitespots-marzahnhellersdorf-2'],
        layers: ['lines-tram', 'lines-bus', 'lines-light_rail', 'lines-subway'],
        popupMarkers: [Place.S_POELCHAUSTRASSE, Place.S_SPRINGPFUHL, Place.U_HELLERSDORF, Place.TRAM_AHRENSFELDE, Place.TRAM_HELLERSDORF_U, Place.TRAM_STENDALER],
        flyToLocation: Place.MARZAHN_HELLERSDORF},
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

    switch (mapName) {
      case 'understanding': {
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
        break;
      }

      case 'visibility-walk': {
        if (event.clearOthers) {
          this.opacitiesVisibilityWalk.forEach((value: number, key: string) => {
            this.opacitiesVisibilityWalk.set(key, 0);
          });
        }

        event.layers.forEach(layer => {
          this.opacitiesVisibilityWalk.set(layer, event.opacity);
        });
        this.opacitiesVisibilityWalk = new Map(this.opacitiesVisibilityWalk);
        break;
      }

      case 'visibility-transport': {
        if (event.clearOthers) {
          this.opacitiesVisibilityTransport.forEach((value: number, key: string) => {
            this.opacitiesVisibilityTransport.set(key, 0);
          });
        }

        event.layers.forEach(layer => {
          this.opacitiesVisibilityTransport.set(layer, event.opacity);
        });
        this.opacitiesVisibilityTransport = new Map(this.opacitiesVisibilityTransport);
        break;
      }

      case 'problems': {
        if (event.clearOthers) {
          this.opacitiesProblems.forEach((value: number, key: string) => {
            this.opacitiesProblems.set(key, 0);
          });
        }

        event.layers.forEach(layer => {
          this.opacitiesProblems.set(layer, event.opacity);
        });
        this.opacitiesProblems = new Map(this.opacitiesProblems);
        break;
      }

      case 'whitespots': {
        const initialLayers = ['isochrones-all-15', 'commercial', 'industrial', 'university'];
        const initialPopupMarkers = [Place.SPANDAU, Place.CHARLOTTENBURGNORD, Place.GEWERBEGEBIET_BRITZ, Place.LANDSBERGER_ALLEE,
          Place.MARZAHN_HELLERSDORF];

        if (event.clearOthers) {
          this.opacitiesWhitespots.forEach((value: number, key: string) => {
            this.opacitiesWhitespots.set(key, 0);
          });
        }

        event.layers.concat(initialLayers).forEach(layer => {
          this.opacitiesWhitespots.set(layer, event.opacity);
        });

        this.flyToLocationWhitespots = event.flyToLocation;
        this.flyToBoundingBoxWhitespots = event.flyToBoundingBox;
        this.popupMarkersWhitespots = event.popupMarkers != null
          ? event.popupMarkers.concat(...initialPopupMarkers)
          : initialPopupMarkers;

        break;
      }
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
