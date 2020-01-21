import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentHomeComponent } from './segment-home.component';

describe('SegmentHomeComponent', () => {
  let component: SegmentHomeComponent;
  let fixture: ComponentFixture<SegmentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
