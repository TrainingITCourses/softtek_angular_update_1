import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ActivitiesRepository } from '../shared/activities.repository';

export const activityResolver: ResolveFn<any> = (route, state) => {
  const id = route.paramMap.get('id') || '';
  if (!id) return null;
  const activitiesRepository = inject(ActivitiesRepository);
  return activitiesRepository.getById$(id);
};
