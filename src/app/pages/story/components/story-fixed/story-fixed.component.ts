import {AfterViewInit, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {DOCUMENT, ViewportScroller} from '@angular/common';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SectionHeaderComponent} from '../section-header/section-header.component';
import {MapComponent} from '../../../../ui/map/map/map.component';
import {MatToolbar} from '@angular/material/toolbar';

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
  /** List of section header components */
  @ViewChildren(SectionHeaderComponent, {read: ElementRef}) sectionHeaders2: QueryList<ElementRef>;

  /** Whether or not the toolbar should be sticky */
  toolbarSticky = false;
  /** Whether or not the map should be sticky */
  mapSticky = false;

  offsets = new Map<number, string>();

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;

  /**
   * Constructor
   * @param document document
   * @param viewportScroller viewport scroller
   */
  constructor(@Inject(DOCUMENT) private document: Document,
              private viewportScroller: ViewportScroller) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    const mapOffsetTop = this.map.nativeElement.offsetTop;
    const headerTopRowHeight = 30;

    // Subscribe scroll events
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((e: Event) => {

        // Make map sticky if user scrolled far enough
        this.mapSticky = window.scrollY > mapOffsetTop - 200;
      });
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
}
