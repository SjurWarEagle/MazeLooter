import { TestBed } from '@angular/core/testing';

import { MazeGeneratorService } from './maze-generator.service';

describe('MazeGeneratorService', () => {
  let service: MazeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
