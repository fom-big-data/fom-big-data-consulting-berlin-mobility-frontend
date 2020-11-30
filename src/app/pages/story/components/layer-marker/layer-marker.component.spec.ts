import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerMarkerComponent} from './layer-marker.component';

describe('LayerMarkerComponent', () => {
  let component: LayerMarkerComponent;
  let fixture: ComponentFixture<LayerMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerMarkerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
