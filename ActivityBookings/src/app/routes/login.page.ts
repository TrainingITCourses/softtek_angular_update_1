import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, of, switchMap } from 'rxjs';
import { AuthRepository } from '../shared/auth.repository';

@Component({
  selector: 'lab-login',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <!-- <button (click)="onLoginClick()">Login</button> -->
    <button (click)="loginButtonClick$.next()">Login</button>

    @if (error()) {
      <pre>🔥 {{ error() | json }}</pre>
    } @else {
      @if (response()) {
        <pre>✅ {{ response() | json }}</pre>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class LoginPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };
  //error = signal<any>('none');
  error = computed(() => this.response()?.error);
  //response: Signal<any> | WritableSignal<any> = signal<any>(null);

  // ToDo: Algo que dispare el observable a partir de un evento de usuario...
  loginButtonClick$ = new Subject<void>();
  response = toSignal(
    this.loginButtonClick$.pipe(
      switchMap(() =>
        this.#authRepository.postLogin$(this.credentials).pipe(
          catchError((error) => {
            // ! do not update the template
            // this.error.set(error);
            // throw error;
            return of({ error });
          }),
        ),
      ),
    ),
    {
      initialValue: null,
    },
  );

  onLoginClick() {
    // * 1️⃣ listener imperative
    // this.#authRepository.postLogin$(this.credentials).subscribe({
    //   next: (response) => this.response.set(response),
    //   error: (error) => this.error.set(error),
    // });
  }
}
