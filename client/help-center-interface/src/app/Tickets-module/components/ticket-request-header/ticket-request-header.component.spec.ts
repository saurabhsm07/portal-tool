import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRequestHeaderComponent } from './ticket-request-header.component';

describe('TicketRequestHeaderComponent', () => {
  let component: TicketRequestHeaderComponent;
  let fixture: ComponentFixture<TicketRequestHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketRequestHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRequestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
