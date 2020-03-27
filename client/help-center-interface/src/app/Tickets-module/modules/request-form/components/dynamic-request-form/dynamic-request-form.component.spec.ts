import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRequestFormComponent } from './dynamic-request-form.component';

describe('DynamicRequestFormComponent', () => {
  let component: DynamicRequestFormComponent;
  let fixture: ComponentFixture<DynamicRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
