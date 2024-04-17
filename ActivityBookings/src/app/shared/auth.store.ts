import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

export type Auth = {
  user: { id: string; email: string };
  accessToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  #router: Router = inject(Router);
  #state: WritableSignal<Auth | undefined> = signal<Auth | undefined>(undefined);

  #saveToStorage = effect(() => {
    const state = this.#state();
    const stateJson = JSON.stringify(state);
    console.log('saving to l.s', stateJson);
  });

  #redirectAfterChange = effect(() => {
    if (this.isAnonymous()) this.#router.navigate(['/login']);
    else this.#router.navigate(['']);
  });

  state: Signal<Auth | undefined> = this.#state.asReadonly();

  isAnonymous: Signal<boolean> = computed(() => this.#state() === undefined);

  accessToken: Signal<string | undefined> = computed(() => this.#state()?.accessToken);

  setLogin(value: any) {
    this.#state.set(value);
  }

  setAnonymous() {
    this.#state.set(undefined);
  }
}
