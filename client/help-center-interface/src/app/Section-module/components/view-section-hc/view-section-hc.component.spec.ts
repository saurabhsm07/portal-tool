import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionHcComponent } from './view-section-hc.component';

describe('ViewSectionHcComponent', () => {
  let component: ViewSectionHcComponent;
  let fixture: ComponentFixture<ViewSectionHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSectionHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectionHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
