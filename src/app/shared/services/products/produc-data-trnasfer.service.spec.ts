import { TestBed } from '@angular/core/testing';

import { ProducDataTrnasferService } from './produc-data-trnasfer.service';

describe('ProducDataTrnasferService', () => {
  let service: ProducDataTrnasferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducDataTrnasferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
