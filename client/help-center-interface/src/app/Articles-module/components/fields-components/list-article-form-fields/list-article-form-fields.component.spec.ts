import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleFormFieldsComponent } from './list-article-form-fields.component';

describe('ListArticleFormFieldsComponent', () => {
  let component: ListArticleFormFieldsComponent;
  let fixture: ComponentFixture<ListArticleFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
