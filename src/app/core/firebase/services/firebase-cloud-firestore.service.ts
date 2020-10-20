import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

/**
 * Handles Cloud Firestore access
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseCloudFirestoreService {

  /** Results collection */
  resultsCollection: AngularFirestoreCollection<any>;
  /** Results observable */
  resultsObservable: Observable<any[]>;
  /** Results subject */
  resultsSubject: Subject<any[]>;

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param angularFirestore Angular Firestore
   */
  constructor(private angularFirestore: AngularFirestore) {
    this.resultsSubject = new Subject<any[]>();
  }

  /**
   * Cancels subscription
   */
  cancelSubscription() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  /**
   * Reads results of a given user
   */
  readResults() {
    this.resultsCollection = this.angularFirestore.collection<any>('results');
    this.resultsObservable = this.resultsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data() as any;
      }))
    );
    this.resultsObservable.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe(results => {
        this.resultsSubject.next(results);
      }
    );
  }
}
