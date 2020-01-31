import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideadminHomeComponent } from './guideadmin-home.component';

describe('GuideadminHomeComponent', () => {
  let component: GuideadminHomeComponent;
  let fixture: ComponentFixture<GuideadminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideadminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideadminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
