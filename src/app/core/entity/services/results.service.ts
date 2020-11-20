import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FirebaseCloudFirestoreService} from '../../firebase/services/firebase-cloud-firestore.service';
import {FirebaseStorageService} from '../../firebase/services/firebase-storage.service';
import {Result} from '../../firebase/model/result.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  /** Subject that publishes results */
  resultSubject = new Subject<Result>();

  /**
   * Constructor
   * @param firebaseCloudFirestoreService Firebase Cloud Firestore service
   * @param firebaseStorageService Firebase Storage service
   */
  constructor(private firebaseCloudFirestoreService: FirebaseCloudFirestoreService,
              private firebaseStorageService: FirebaseStorageService,
              private http: HttpClient) {
    this.initializeCloudFirestoreSubscription();
    this.initializeStorageSubscription();
  }

  //
  // Initialization
  //

  /**
   * Initializes results subscription from Cloud Firestore
   */
  private initializeCloudFirestoreSubscription() {
    this.firebaseCloudFirestoreService.resultsSubject.subscribe(results => {
      results.forEach(result => {
        this.resultSubject.next(result);
      });
    });
  }

  /**
   * Initializes results subscription from Fire Storage
   */
  private initializeStorageSubscription() {
    this.firebaseStorageService.resultsSubject.subscribe(results => {
      results.forEach(result => {
        this.resultSubject.next(result);
      });
    });
  }

  //
  // Others
  //

  /**
   * Loads results from Cloud Firestore
   */
  findResultsCloudFirestore() {
    this.firebaseCloudFirestoreService.readResults();
  }

  /**
   * Loads results from Fire Storage
   */
  findResultsFireStorage() {
    this.firebaseStorageService.readResults();
  }

  /**
   * Downloads results from Github
   */
  findResultsGithub() {
    const baseUrl = environment.github.resultsUrl;

    environment.results.forEach(file => {
      this.http.get(baseUrl + file, {responseType: 'text' as 'json'}).subscribe(data => {
        this.resultSubject.next(new Result(file, data));
      });
    });
  }
}
