import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroMobilityComponent } from './micro-mobility.component';

describe('MicroMobilityComponent', () => {
  let component: MicroMobilityComponent;
  let fixture: ComponentFixture<MicroMobilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroMobilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
