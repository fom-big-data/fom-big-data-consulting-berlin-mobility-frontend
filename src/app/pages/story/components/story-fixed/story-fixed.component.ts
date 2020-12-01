import {AfterViewInit, Component, ElementRef, Inject, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {DOCUMENT, ViewportScroller} from '@angular/common';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SectionHeaderComponent} from '../section-header/section-header.component';
import {MapComponent} from '../../../../ui/map/map/map.component';
import {MatToolbar} from '@angular/material/toolbar';
import {LayerMarkerComponent} from '../layer-marker/layer-marker.component';

/**
 * Displays a story
 */
@Component({
  selector: 'app-story-fixed',
  templateUrl: './story-fixed.component.html',
  styleUrls: ['./story-fixed.component.scss']
})
export class StoryFixedComponent implements AfterViewInit {

  /** Toolbar component */
  @ViewChild(MatToolbar, {read: ElementRef}) toolbar: ElementRef;
  /** Map component */
  @ViewChild(MapComponent, {read: ElementRef}) map: ElementRef;
  /** List of section header components */
  @ViewChildren(SectionHeaderComponent) sectionHeaders: QueryList<SectionHeaderComponent>;
  /** List of layer marker components */
  @ViewChildren(LayerMarkerComponent) layerMarkers: QueryList<LayerMarkerComponent>;

  /** List of results to be displayed  */
  results: string[] = [];
  /** Map of transparency values */
  transparencies = new Map<string, number>();
  /** List of visible layer markers */
  visibleLayerMarkers: string[] = [];

  /** Whether or not the toolbar should be sticky */
  toolbarSticky = false;
  /** Whether or not the map should be sticky */
  mapSticky = false;

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;

  /**
   * Constructor
   * @param document document
   * @param renderer renderer
   * @param viewportScroller viewport scroller
   */
  constructor(@Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private viewportScroller: ViewportScroller) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {

    // Initial offset of toolbar component
    const toolbarOffsetTop = this.toolbar.nativeElement.offsetTop;
    const headerTopRowHeight = 30;

    // Initial offset of map component
    const mapOffsetTop = this.map.nativeElement.offsetTop;

    // Subscribe scroll events
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(() => {

        // Make toolbar sticky if user scrolled far enough
        this.toolbarSticky = window.scrollY > toolbarOffsetTop - headerTopRowHeight;

        // Make map sticky if user scrolled far enough
        this.mapSticky = window.scrollY > mapOffsetTop - 200;
      });

    // Make all layers invisible
    const resultsMap = new Map<string, string>();
    this.layerMarkers.forEach(layerMarker => {
      resultsMap.set(layerMarker.layerName, layerMarker.layerName);
      this.transparencies.set(layerMarker.layerName, 0);
    });

    this.results = Array.from(resultsMap.values());
  }

  //
  // Helpers
  //

  /**
   * Scrolls to an element
   * @param anchor anchor
   */
  scrollToElement(anchor) {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  /**
   * Handles visibility of layer markers
   * @param event event
   */
  onLayerMarkerVisibilityChanged(event: { layerName: string; transparency: number }) {
    // Update list of visible layers
    if (event.transparency > 0) {
      this.visibleLayerMarkers.push(event.layerName);
    } else {
      this.visibleLayerMarkers = this.visibleLayerMarkers.filter(value => {
        return value !== event.layerName;
      });
    }

    // Set layer transparency
    this.transparencies.set(event.layerName, event.transparency);


    // Trigger change detection
    this.transparencies = new Map(this.transparencies);
  }
}
