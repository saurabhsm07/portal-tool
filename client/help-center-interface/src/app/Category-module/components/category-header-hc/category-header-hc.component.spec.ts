import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeaderHcComponent } from './category-header-hc.component';

describe('CategoryHeaderHcComponent', () => {
  let component: CategoryHeaderHcComponent;
  let fixture: ComponentFixture<CategoryHeaderHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryHeaderHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHeaderHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
