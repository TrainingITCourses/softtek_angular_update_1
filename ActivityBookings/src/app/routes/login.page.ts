import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { AuthRepository } from '../shared/auth.repository';

type Response = {
  result?: any;
  error?: any;
};

@Component({
  selector: 'lab-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <h3>Log in</h3>
    <button (click)="loginClick$.next()">Login</button>
    @if (error(); as error) {
      <pre>🔥 {{ error | json }}</pre>
    } @else {
      @if (result(); as result) {
        <pre>{{ result | json }}</pre>
      }
    }
  `,
})
export default class LoginPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  #router: Router = inject(Router);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };
  error = computed(() => this.response()?.error);
  result = computed(() => this.response()?.result);

  #redirectOnLogin = effect(() => {
    if (this.result()) {
      this.#router.navigate(['']);
    }
  });

  loginClick$ = new Subject<void>();
  postLogin$ = () => this.#authRepository.postLogin$(this.credentials);
  response = toSignal(this.loginClick$.pipe(switchMap(this.postLogin$)), {
    initialValue: { result: null, error: null },
  });
}
