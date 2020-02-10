import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryHcComponent } from './view-category-hc.component';

describe('ViewCategoryHcComponent', () => {
  let component: ViewCategoryHcComponent;
  let fixture: ComponentFixture<ViewCategoryHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCategoryHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCategoryHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
