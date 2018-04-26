import { TestBed, inject } from '@angular/core/testing';

import { CartInfoService } from './cart-info.service';

describe('CartInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartInfoService]
    });
  });

  it('should be created', inject([CartInfoService], (service: CartInfoService) => {
    expect(service).toBeTruthy();
  }));
});
