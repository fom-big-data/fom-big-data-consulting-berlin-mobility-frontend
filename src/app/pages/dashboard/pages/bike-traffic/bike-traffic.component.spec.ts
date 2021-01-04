import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTrafficComponent } from './bike-traffic.component';

describe('BikeTrafficComponent', () => {
  let component: BikeTrafficComponent;
  let fixture: ComponentFixture<BikeTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
