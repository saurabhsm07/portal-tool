import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleFormFieldsComponent } from './create-article-form-fields.component';

describe('CreateArticleFormFieldsComponent', () => {
  let component: CreateArticleFormFieldsComponent;
  let fixture: ComponentFixture<CreateArticleFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArticleFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
