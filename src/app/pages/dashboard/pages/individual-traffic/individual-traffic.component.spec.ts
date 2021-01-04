import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTrafficComponent } from './individual-traffic.component';

describe('IndividualTrafficComponent', () => {
  let component: IndividualTrafficComponent;
  let fixture: ComponentFixture<IndividualTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
