import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleFormComponent } from './edit-article-form.component';

describe('EditArticleFormComponent', () => {
  let component: EditArticleFormComponent;
  let fixture: ComponentFixture<EditArticleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
