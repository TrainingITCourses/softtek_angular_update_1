import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { ActivitiesRepository } from '../shared/activities.repository';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <h2>Activity Id: {{ id() }}</h2>
    <!-- <pre> {{ activityComputed() | async | json }}</pre> -->
    <!-- <pre> {{ activityEffect() | json }}</pre> -->
    <pre> {{ activityToSignal() | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivityPage {
  #activitiesService = inject(ActivitiesRepository);
  id: Signal<string> = input<string>('');
  // activityComputed: Signal<Observable<any>> = computed(() =>
  //   this.#activitiesService.getById$(this.id()),
  // );
  // activityEffect: WritableSignal<any> = signal<any>(null);
  // #loadActivity = effect(
  //   () => {
  //     if (this.id()) {
  //       this.#activitiesService.getById$(this.id()).subscribe((a) => this.activityEffect.set(a));
  //     }
  //   },
  //   {
  //     allowSignalWrites: true,
  //   },
  // );
  //activity: Signal<any> = toSignal(this.#activitiesService.getById$(this.id()));
  id$: Observable<string> = toObservable(this.id);
  activityToSignal = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.#activitiesService.getById$(id))),
  );
}
