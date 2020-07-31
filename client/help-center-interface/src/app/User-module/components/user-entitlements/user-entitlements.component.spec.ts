import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntitlementsComponent } from './user-entitlements.component';

describe('UserEntitlementsComponent', () => {
  let component: UserEntitlementsComponent;
  let fixture: ComponentFixture<UserEntitlementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEntitlementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntitlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
