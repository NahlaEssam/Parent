import { TestBed } from '@angular/core/testing';

import { RouterGaurdService } from './router-gaurd.service';

describe('RouterGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterGaurdService = TestBed.get(RouterGaurdService);
    expect(service).toBeTruthy();
  });
});
