import {Component, OnInit} from '@angular/core';
import {ResultsFirestoreService} from './core/entity/services/results-firestore.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MapBoxStyle} from './core/mapbox/model/map-box-style.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fom-big-data-consulting-berlin-mobility-frontend';

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;

  constructor(private resultsFirestoreService: ResultsFirestoreService) {
  }

  ngOnInit() {
    this.initializeResultSubscription();
  }

  /**
   * Initializes result subscription
   */
  private initializeResultSubscription() {
    // Clear results
    this.resultsFirestoreService.clearResults();

    // Subscribe results
    this.resultsFirestoreService.resultsSubject.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe((value) => {
      if (value != null) {
        console.log(JSON.stringify(value));
      }
    });

    // Find results
    this.resultsFirestoreService.findResults();
  }
}
