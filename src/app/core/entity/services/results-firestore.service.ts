import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FirebaseCloudFirestoreService} from '../../firebase/services/firebase-cloud-firestore.service';
import {UUID} from '../model/uuid';

@Injectable({
  providedIn: 'root'
})
export class ResultsFirestoreService {

  /** Map of all results */
  results = new Map<string, any>();
  /** Subject that publishes results */
  resultsSubject = new Subject<any[]>();

  constructor(private firebaseCloudFirestoreService: FirebaseCloudFirestoreService) {
    this.initializeResultsSubscription();
  }

  //
  // Initialization
  //

  /**
   * Clears results
   */
  clearResults() {
    this.results.clear();
  }

  /**
   * Loads results from Firebase
   */
  findResults() {
    this.firebaseCloudFirestoreService.readResults();
  }

  /**
   * Initializes results subscription from Firestore
   */
  private initializeResultsSubscription() {
    this.firebaseCloudFirestoreService.resultsSubject.subscribe(result => {
      result.forEach(element => {
        this.results.set(new UUID().toString(), result);
      });
      this.notifyMultipleResults();
    });
  }

  //
  // Others
  //

  /**
   * Informs subscribers that something has changed
   */
  public notifyMultipleResults() {
    this.resultsSubject.next(Array.from(this.results.values()).sort((t1, t2) => {
      return new Date(t2.modificationDate).getTime() - new Date(t1.modificationDate).getTime();
    }));
  }
}
