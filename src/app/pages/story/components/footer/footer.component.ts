import {Component, Inject, Input, QueryList} from '@angular/core';
import {SectionHeaderComponent} from '../section-header/section-header.component';
import {DOCUMENT, ViewportScroller} from '@angular/common';

/**
 * Displays page footer
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  /** List of section header components */
  @Input() sectionHeaders: QueryList<SectionHeaderComponent>;

  /**
   * Constructor
   * @param viewportScroller viewport scroller
   */
  constructor(private viewportScroller: ViewportScroller) {
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
