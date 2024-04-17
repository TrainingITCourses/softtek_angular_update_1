import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { activityResolver } from './activity.resolver';

describe('activityResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => activityResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
