import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFixedComponent } from './story-fixed.component';

describe('StoryFixedComponent', () => {
  let component: StoryFixedComponent;
  let fixture: ComponentFixture<StoryFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
