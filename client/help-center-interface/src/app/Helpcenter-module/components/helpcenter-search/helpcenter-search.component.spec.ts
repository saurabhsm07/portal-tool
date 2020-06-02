import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterSearchComponent } from './helpcenter-search.component';

describe('HelpcenterSearchComponent', () => {
  let component: HelpcenterSearchComponent;
  let fixture: ComponentFixture<HelpcenterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
