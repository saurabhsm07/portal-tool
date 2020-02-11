import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHeaderHcComponent } from './article-header-hc.component';

describe('ArticleHeaderHcComponent', () => {
  let component: ArticleHeaderHcComponent;
  let fixture: ComponentFixture<ArticleHeaderHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleHeaderHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHeaderHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
