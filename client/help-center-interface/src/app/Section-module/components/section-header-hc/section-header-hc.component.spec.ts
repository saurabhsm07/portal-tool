import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeaderHcComponent } from './section-header-hc.component';

describe('SectionHeaderHcComponent', () => {
  let component: SectionHeaderHcComponent;
  let fixture: ComponentFixture<SectionHeaderHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionHeaderHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeaderHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
