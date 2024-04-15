import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <article>
      <header>My home page</header>
      <main>
        @for (activity of activities(); track activity.id) {
          <div>
            {{ activity.name }}
          </div>
        } @empty {
          <div>no data yet</div>
        }
      </main>
      <footer>
        Got <mark>{{ activitiesCount() }}</mark> activities
      </footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  #http = inject(HttpClient);
  #url = `${environment.apiUrl}/activities`;

  // activities: any[] = [];
  // activities$ = this.#http.get<any[]>(this.#url);
  activities: WritableSignal<any[]> = signal<any[]>([]);

  activitiesCount: Signal<number> = computed(() => this.activities().length);

  constructor() {
    //this.#http.get<any[]>(this.#url).subscribe((datos) => (this.activities = datos));
    this.#http.get<any[]>(this.#url).subscribe((datos) => this.activities.set(datos));
  }
}
