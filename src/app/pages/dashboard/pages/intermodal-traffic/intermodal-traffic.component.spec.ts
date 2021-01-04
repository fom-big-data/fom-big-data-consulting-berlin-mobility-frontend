import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermodalTrafficComponent } from './intermodal-traffic.component';

describe('IntermodalTrafficComponent', () => {
  let component: IntermodalTrafficComponent;
  let fixture: ComponentFixture<IntermodalTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermodalTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermodalTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
