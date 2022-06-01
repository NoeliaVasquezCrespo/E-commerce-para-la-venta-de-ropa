import { TestBed } from '@angular/core/testing';

import { ProductDetailsService } from './productdetails.service';

describe('ProductlistService', () => {
  let service: ProductDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});