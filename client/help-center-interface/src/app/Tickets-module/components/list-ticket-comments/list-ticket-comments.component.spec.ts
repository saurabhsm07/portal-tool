import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTicketCommentsComponent } from './list-ticket-comments.component';

describe('ListTicketCommentsComponent', () => {
  let component: ListTicketCommentsComponent;
  let fixture: ComponentFixture<ListTicketCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTicketCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
