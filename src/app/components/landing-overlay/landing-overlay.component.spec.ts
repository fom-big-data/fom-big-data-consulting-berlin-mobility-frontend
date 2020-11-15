import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingOverlayComponent } from './landing-overlay.component';

describe('LandingOverlayComponent', () => {
  let component: LandingOverlayComponent;
  let fixture: ComponentFixture<LandingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
