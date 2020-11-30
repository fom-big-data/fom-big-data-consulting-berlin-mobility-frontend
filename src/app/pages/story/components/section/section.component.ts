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
      });
    });
  }
}
