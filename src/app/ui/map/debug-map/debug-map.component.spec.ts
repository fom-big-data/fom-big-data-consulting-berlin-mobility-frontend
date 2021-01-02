import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugMapComponent } from './debug-map.component';

describe('MapComponent', () => {
  let component: DebugMapComponent;
  let fixture: ComponentFixture<DebugMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
