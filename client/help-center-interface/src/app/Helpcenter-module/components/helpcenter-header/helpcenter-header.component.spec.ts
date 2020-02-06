import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterHeaderComponent } from './helpcenter-header.component';

describe('HelpcenterHeaderComponent', () => {
  let component: HelpcenterHeaderComponent;
  let fixture: ComponentFixture<HelpcenterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
