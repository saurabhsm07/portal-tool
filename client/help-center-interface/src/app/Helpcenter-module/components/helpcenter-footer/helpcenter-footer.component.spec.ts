import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterFooterComponent } from './helpcenter-footer.component';

describe('HelpcenterFooterComponent', () => {
  let component: HelpcenterFooterComponent;
  let fixture: ComponentFixture<HelpcenterFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
