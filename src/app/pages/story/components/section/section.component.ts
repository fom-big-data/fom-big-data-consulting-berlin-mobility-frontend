import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

/**
 * Displays a section
 */
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  /** List of all sections to be displayed  */
  @Input() chapters = [];
  /** Contents */
  contents = [];
  /** Whether there was an error downloading  section */
  error = false;

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
}
