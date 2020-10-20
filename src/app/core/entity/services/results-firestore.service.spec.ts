import {TestBed} from '@angular/core/testing';

import {ResultsFirestoreService} from './results-firestore.service';

describe('ResultsFirestoreService', () => {
  let service: ResultsFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
