import { TestBed } from '@angular/core/testing';

import { SpecificBlogService } from './specific-blog.service';

describe('SpecificBlogService', () => {
  let service: SpecificBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
