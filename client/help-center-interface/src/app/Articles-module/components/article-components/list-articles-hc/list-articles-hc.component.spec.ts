import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesHcComponent } from './list-articles-hc.component';

describe('ListArticlesHcComponent', () => {
  let component: ListArticlesHcComponent;
  let fixture: ComponentFixture<ListArticlesHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticlesHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticlesHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
