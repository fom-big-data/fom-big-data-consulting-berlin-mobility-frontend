import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Location} from '../../../../core/mapbox/model/location.model';
import {BoundingBox} from '../../../../ui/map/model/bounding-box.model';

/**
 * Displays a section
 */
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, OnChanges {

  /** Height of the section */
  @Input() height = '100%';
  /** List of all sections to be displayed  */
  @Input() chapters = [];

  /** Layers names */
  @Input() layers = [];
  /** Pop-up marker names */
  @Input() popupMarkers = [];
  /** Fly-to location */
  @Input() flyToLocation: Location = null;
  /** Fly-to bounding box */
  @Input() flyToBoundingBox: BoundingBox = null;

  /** Opacity */
  @Input() opacity = 100;
  /** Whether or not other layers should be made transparent */
  @Input() clearOthers = true;
  /** Whether or not an event should be emitted when marker is not visible anymore */
  @Input() emitOnLeave = false;

  /** Opacity of active marker */
  @Input() opacityActive = 1.0;
  /** Opacity of passive marker */
  @Input() opacityPassive = 0.3;
  /** Default opacity */
  @Input() opacityDefault = 1.0;

  /** Event emitter indicating section in viewport */
  @Output() sectionInViewportEventEmitter = new EventEmitter<{
    layers: string[],
    popupMarkers: Location[],
    flyToLocation: Location,
    flyToBoundingBox: BoundingBox,
    opacity: number,
    clearOthers: boolean
  }>();

  /** Contents */
  contents = [];
  /** Whether there was an error downloading  section */
  error = false;
  /** Whether or not the section is out of focus */
  inFocus = false;

  /** True if the top of this component is in viewport */
  private topInViewport: boolean;
  /** True if the bottom of this component is in viewport */
  private bottomInViewport: boolean;
  /** Placeholder text */
  private loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, ' +
    'no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ' +
    'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ' +
    'ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';


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
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeSections();
  }

  /**
   * Handles on-changes lifecycle phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.popupMarkers.reverse();
  }

  //
  // Initialization
  //

  /**
   * Initializes sections
   */
  private initializeSections() {

    // Base URL for results
    const baseUrl = environment.github.resultsUrl;

    this.chapters.forEach(name => {
      this.http.get(baseUrl + 'chapters/' + name + '.md', {responseType: 'text' as 'text'}).subscribe((data: any) => {
        this.contents.push(data);
      }, () => {
        this.error = true;
        this.contents.push(this.loremIpsum);
      });
    });
  }

  //
  // Actions
  //

  /**
   * Handles intersection between component and viewport
   * @param target target component
   * @param visible whether the component is visible or not
   */
  public onIntersectionTop({target, visible}: { target: Element; visible: boolean }) {
    this.topInViewport = visible;
    this.notify();
  }

  /**
   * Handles intersection between component and viewport
   * @param target target component
   * @param visible whether the component is visible or not
   */
  public onIntersectionBottom({target, visible}: { target: Element; visible: boolean }) {
    this.bottomInViewport = visible;
    this.notify();
  }

  //
  // Helpers
  //

  /**
   * Notify subscribers about visibility changes
   */
  private notify() {
    if (this.topInViewport && this.bottomInViewport) {
      this.inFocus = true;

      this.sectionInViewportEventEmitter.emit({
        layers: this.layers,
        popupMarkers: this.popupMarkers,
        flyToLocation: this.flyToLocation,
        flyToBoundingBox: this.flyToBoundingBox,
        opacity: this.opacity,
        clearOthers: this.clearOthers
      });
    } else {
      this.inFocus = false;

      if (this.emitOnLeave) {
        this.sectionInViewportEventEmitter.emit({
          layers: [],
          popupMarkers: [],
          flyToLocation: null,
          flyToBoundingBox: null,
          opacity: 0,
          clearOthers: this.clearOthers
        });
      }
    }
  }
}
