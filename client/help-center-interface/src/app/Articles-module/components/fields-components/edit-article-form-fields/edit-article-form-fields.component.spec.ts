import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleFormFieldsComponent } from './edit-article-form-fields.component';

describe('EditArticleFormFieldsComponent', () => {
  let component: EditArticleFormFieldsComponent;
  let fixture: ComponentFixture<EditArticleFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticleFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
