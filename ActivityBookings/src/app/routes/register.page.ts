import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { AuthRepository } from '../shared/auth.repository';
import { ResponseComponent } from '../shared/response.component';

@Component({
  selector: 'lab-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponseComponent],
  template: `
    <h3>Register me</h3>
    <button (click)="registerClick$.next()">Register</button>
    <lab-response [response]="response()" />
  `,
})
export default class RegisterPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  #router: Router = inject(Router);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };

  #redirectOnLogin = effect(() => {
    if (this.response().result) {
      // this.#router.navigate(['']);
    }
  });

  registerClick$: Subject<void> = new Subject<void>();
  postRegister$ = () => this.#authRepository.postRegister$(this.credentials);
  response = toSignal(this.registerClick$.pipe(switchMap(this.postRegister$)), {
    initialValue: { result: null, error: null },
  });
}
