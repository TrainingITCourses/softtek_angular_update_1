import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthRepository } from '../shared/auth.repository';

@Component({
  selector: 'lab-login',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <button (click)="onRegisterClick()">Register</button>
    <pre>{{ response() | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };
  response = signal<any>(null);

  // ToDo: Algo que dispare el observable a partir de un evento de usuario...
  //responseToSignal = toSignal(this.#authRepository.postLogin$(this.credentials));

  onRegisterClick() {
    this.#authRepository.postRegister$(this.credentials).subscribe((res) => this.response.set(res));
  }
}
