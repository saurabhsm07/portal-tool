import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleFormComponent } from './list-article-form.component';

describe('ListArticleFormComponent', () => {
  let component: ListArticleFormComponent;
  let fixture: ComponentFixture<ListArticleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
