import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterBannerComponent } from './helpcenter-banner.component';

describe('HelpcenterBannerComponent', () => {
  let component: HelpcenterBannerComponent;
  let fixture: ComponentFixture<HelpcenterBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
