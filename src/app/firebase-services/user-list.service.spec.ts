import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list.service';

describe('NoteListService', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
