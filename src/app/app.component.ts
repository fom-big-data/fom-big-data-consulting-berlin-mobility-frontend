import {Component, OnInit} from '@angular/core';
import {ResultsService} from './core/entity/services/results.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Result} from './core/firebase/model/result.model';

/**
 * Displays app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /** Title */
  title = 'fom-big-data-consulting-berlin-mobility-frontend';

  /** Map of all results */
  results = new Map<string, any>();

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param resultsService results service
   */
  constructor(private resultsService: ResultsService) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.initializeResultsSubscription();
  }

  //
  // Helpers
  //

  /**
   * Initializes results subscription
   */
  private initializeResultsSubscription() {

    // Subscribe results
    this.resultsService.resultSubject.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe((result: Result) => {
      if (result != null) {
        console.log(`received ${result.name}`);
        this.results.set(result.name, result.payload);
        this.results = new Map(this.results);
      }
    });

    // Find results
    // this.resultsService.findResultsCloudFirestore();
    // this.resultsService.findResultsFireStorage();
    // this.resultsService.findResultsGithub();
  }
}
