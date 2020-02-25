import { TestBed, async, inject } from '@angular/core/testing';

import { AgentOrAdminGuard } from './agent-or-admin.guard';

describe('AgentOrAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentOrAdminGuard]
    });
  });

  it('should ...', inject([AgentOrAdminGuard], (guard: AgentOrAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
