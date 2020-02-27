import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterLogoutComponent } from './helpcenter-logout.component';

describe('HelpcenterLogoutComponent', () => {
  let component: HelpcenterLogoutComponent;
  let fixture: ComponentFixture<HelpcenterLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
