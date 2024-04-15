import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ActivitiesRepository } from '../shared/activities.repository';

@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article>
      <header>My home page</header>
      <main>
        @for (activity of activities(); track activity.id) {
          <div>
            <span>
              <a [routerLink]="['/', activity.id]">{{ activity.name }} </a>
            </span>
            <span>📌 {{ activity.location }} </span>
          </div>
        } @empty {
          <div>no data yet</div>
        }
      </main>
      <footer>
        @if (errorMessage()) {
          <small>{{ errorMessage() }}</small>
        }
        Got <mark>{{ activitiesCount() }}</mark> activities
      </footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  #activitiesService = inject(ActivitiesRepository);
  activities: Signal<any[]> = toSignal(
    this.#activitiesService.getAll$().pipe(
      catchError((e) => {
        this.errorMessage.set(e);
        return throwError(() => new Error('Error fetching data'));
      }),
    ),
    { initialValue: [] },
  );
  activitiesCount: Signal<number> = computed(() => this.activities().length);
  errorMessage: WritableSignal<string> = signal('No error');
  // activities: any[] = [];
  // activities$ = this.#http.get<any[]>(this.#url);
  // activities: WritableSignal<any[]> = signal<any[]>([]);

  // constructor() {
  // this.#activitiesService.getAll$().subscribe({
  //   next: (datos) => (this.activities = datos),
  //   error: (error) => (this.errorMessage = error),
  // });
  //this.#http.get<any[]>(this.#url).subscribe((datos) => this.activities.set(datos));
  // }
}
