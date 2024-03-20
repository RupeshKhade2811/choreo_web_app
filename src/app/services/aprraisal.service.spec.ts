import { TestBed } from '@angular/core/testing';

import { AprraisalService } from './aprraisal.service';

describe('AprraisalService', () => {
  let service: AprraisalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprraisalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
