import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import hljs from 'highlight.js';
import {DomSanitizer} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

/**
 * Markdown converter instance including configuration
 */
// @ts-ignore
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
      }
    }

    return ''; // use external default escaping
  }
});

/**
 * Default renderer for markdown
 */
// tslint:disable-next-line:only-arrow-functions
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

/**
 * Adds configuration for links
 * @param tokens tokens
 * @param idx idx
 * @param options options
 * @param env env
 * @param self self
 */
// tslint:disable-next-line:only-arrow-functions
md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  // Pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

/**
 * Displays rendered markdown text
 */
@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewComponent implements OnChanges {

  /** Text to be formatted */
  @Input() markdownText = '';
  /** Prevents paragraph margin if true */
  @Input() preventParagraphMargins = false;
  /** Removes linebreaks if true */
  @Input() removeLinebreaks = true;

  /** Opacity of active marker */
  @Input() opacityActive = 1.0;
  /** Opacity of passive marker */
  @Input() opacityPassive = 0.3;
  /** Default opacity */
  @Input() opacityDefault = 1.0;

  /** Text transformed into html */
  htmlText = '';

  /**
   * Constructor
   * @param document document
   * @param sanitizer sanitizer
   */
  constructor(@Inject(DOCUMENT) private document: Document, private sanitizer: DomSanitizer) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-change lifecycle phase
   * @param changes simple changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updateMarkdown();
  }

  //
  // Actions
  //

  /**
   * Handles mouse enter event
   */
  onMouseEnter() {
    this.initializeHoverableMarkers();
  }

  //
  // Helpers
  //

  /**
   * Updates markdown
   */
  private updateMarkdown() {
    if (this.markdownText != null) {
      if (this.removeLinebreaks) {
        this.htmlText = md.render(this.markdownText).replace(/<br>/g, '');
      } else {
        this.htmlText = md.render(this.markdownText);
      }
    }
  }

  /**
   * Initializes hoverable markers
   */
  private initializeHoverableMarkers() {

    // Identify all markers on the map
    const hoverableMarkersElements = this.document.getElementsByClassName('mapboxgl-marker');
    const hoverableMarkers = Array.from(hoverableMarkersElements).map(e => {
      return e.id.replace(/marker-/g, '');
    });

    // Iterate over all markers
    hoverableMarkers.forEach(name => {

      // Get marker on the map
      const marker = this.document.getElementById(`marker-${name}`);
      // Get marker label in the text
      const markerLabel = this.document.getElementById(`marker-label-${name}`);

      // Define mouse-enter event
      const mouseEnterEvent = (_ => {

        // Iterate over all markers
        hoverableMarkers.forEach(hoverableMarker => {
          const markerElement = this.document.getElementById(`marker-${hoverableMarker}`);

          if (markerElement != null) {

            // Set markers active or passive depending on whether they are hovered or not
            if (hoverableMarker === name) {
              markerElement.style.opacity = this.opacityActive.toString();
              markerElement.style.border = '5px solid white';
              markerElement.style.zIndex = '10';
            } else {
              markerElement.style.opacity = this.opacityPassive.toString();
              markerElement.style.border = '0 solid transparent';
              markerElement.style.zIndex = '9';
            }
          }
        });
      });

      // Define mouse-leave event
      const mouseLeaveEvent = (_ => {

        // Iterate over all markers
        hoverableMarkers.forEach(hoverableMarker => {
          const markerElement = this.document.getElementById(`marker-${hoverableMarker}`);

          // Reset all markers to default
          if (markerElement != null) {
            markerElement.style.opacity = this.opacityDefault.toString();
            markerElement.style.border = '0 solid transparent';
            markerElement.style.zIndex = '9';
          }
        });
      });

      // Add events to markers
      try {
        marker.onmouseenter = mouseEnterEvent;
        marker.onmouseleave = mouseLeaveEvent;
      } catch (e) {
      }

      // Add events to marker labels
      try {
        markerLabel.onmouseenter = mouseEnterEvent;
        markerLabel.onmouseleave = mouseLeaveEvent;
      } catch (e) {
      }
    });
  }
}
