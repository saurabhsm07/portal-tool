import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormFieldsComponent } from './article-form-fields.component';

describe('ArticleFormFieldsComponent', () => {
  let component: ArticleFormFieldsComponent;
  let fixture: ComponentFixture<ArticleFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
