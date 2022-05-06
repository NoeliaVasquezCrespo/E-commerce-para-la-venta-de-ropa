import { TestBed } from '@angular/core/testing';

import { AddofferService } from './addoffer.service';

describe('AddofferService', () => {
  let service: AddofferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddofferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
