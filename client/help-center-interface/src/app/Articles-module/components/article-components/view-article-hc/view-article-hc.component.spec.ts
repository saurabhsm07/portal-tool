import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticleHcComponent } from './view-article-hc.component';

describe('ViewArticleHcComponent', () => {
  let component: ViewArticleHcComponent;
  let fixture: ComponentFixture<ViewArticleHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArticleHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArticleHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
