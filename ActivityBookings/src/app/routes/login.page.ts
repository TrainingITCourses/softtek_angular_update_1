import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthRepository } from '../shared/auth.repository';

@Component({
  selector: 'lab-login',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <button (click)="onLoginClick()">Login</button>
    <pre>{{ response() | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };
  response = signal<any>(null);

  // ToDo: Algo que dispare el observable a partir de un evento de usuario...
  //responseToSignal = toSignal(this.#authRepository.postLogin$(this.credentials));

  onLoginClick() {
    this.#authRepository.postLogin$(this.credentials).subscribe((res) => this.response.set(res));
  }
}
