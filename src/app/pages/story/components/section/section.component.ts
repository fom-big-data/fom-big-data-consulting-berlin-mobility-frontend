import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Location} from '../../../../core/mapbox/model/location.model';

/**
 * Displays a section
 */
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  /** Height of the section */
  @Input() height = '100%';
  /** List of all sections to be displayed  */
  @Input() chapters = [];

  /** Layers names */
  @Input() layers = null;
  /** Fly-to location */
  @Input() flyToLocation: Location = null;
  /** Opacity */
  @Input() opacity = 100;
  /** Whether or not other layers should be made transparent */
  @Input() clearOthers = true;
  /** Whether or not an event should be emitted when marker is not visible anymore */
  @Input() emitOnLeave = false;
  /** Event emitter indicating section in viewport */
  @Output() sectionInViewportEventEmitter = new EventEmitter<{
    layers: string[],
    flyToLocation: Location,
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
   * Handles on-init phase
   */
  ngOnInit() {
    this.initializeSections();
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
        flyToLocation: this.flyToLocation,
        opacity: this.opacity,
        clearOthers: this.clearOthers
      });
    } else {
      this.inFocus = false;

      if (this.emitOnLeave) {
        this.sectionInViewportEventEmitter.emit({
          layers: this.layers,
          flyToLocation: this.flyToLocation,
          opacity: 0,
          clearOthers: this.clearOthers
        });
      }
    }
  }
}
