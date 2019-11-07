import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNotFoundComponent } from './article-not-found.component';

describe('ArticleNotFoundComponent', () => {
  let component: ArticleNotFoundComponent;
  let fixture: ComponentFixture<ArticleNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
