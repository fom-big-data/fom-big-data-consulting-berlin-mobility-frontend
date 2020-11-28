import {AfterViewInit, Component, ElementRef, Input, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../core/mapbox/model/place.model';
import {SectionHeaderComponent} from './components/section-header/section-header.component';
import {ViewportScroller} from '@angular/common';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * Displays a story
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements AfterViewInit, OnDestroy {

  /** Map of all geojsons */
  @Input() geojsons = new Map<string, any>();

  /** Toolbar component */
  @ViewChild('toolbar', {read: ElementRef}) toolbar: ElementRef;
  /** List of section header components */
  @ViewChildren(SectionHeaderComponent) sectionHeaders: QueryList<SectionHeaderComponent>;
  /** Whether or not the toolbar should be sticky */
  toolbarSticky = false;

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing place */
  placeEnum = Place;

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param viewportScroller viewport scroller
   */
  constructor(private viewportScroller: ViewportScroller) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    const toolbarOffsetTop = this.toolbar.nativeElement.offsetTop;
    const headerTopRowHeight = 26;

    // Subscribe scroll events
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((e: Event) => {

        // Make toolbar sticky if user scrolled far enough
        this.toolbarSticky = window.scrollY > toolbarOffsetTop - headerTopRowHeight;
      });
  }

  /**
   * Handles on-destroy phase
   */
  ngOnDestroy() {
    this.unsubscribeSubject.next();
  }

  /**
   * Scrolls to an element
   * @param anchor anchor
   */
  scrollToElement(anchor): void {
    console.log(anchor);
    this.viewportScroller.scrollToAnchor(anchor);
  }
}
