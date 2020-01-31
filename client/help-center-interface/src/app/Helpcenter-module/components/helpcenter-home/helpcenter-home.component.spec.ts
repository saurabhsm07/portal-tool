import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterHomeComponent } from './helpcenter-home.component';

describe('HelpcenterHomeComponent', () => {
  let component: HelpcenterHomeComponent;
  let fixture: ComponentFixture<HelpcenterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
