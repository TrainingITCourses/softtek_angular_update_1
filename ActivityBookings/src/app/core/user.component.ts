import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';
import { UserStatus } from './user-status.type';

@Component({
  selector: 'lab-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span>🍪 {{ cookies() }}</span>
    <span>👤 {{ auth() }}</span>
  `,
})
export class UserComponent {
  /** Input required signal */
  user: InputSignal<UserStatus> = input.required<UserStatus>();

  /** Compute over input signals */

  cookies: Signal<string> = computed(() => {
    const cookies = this.user().cookies;
    switch (cookies) {
      case 'all':
        return '💚';
      case 'essentials':
        return '🤍';
      case 'rejected':
        return '🚫';
      default:
        return '❔';
    }
  });
  auth: Signal<string> = computed(() => (this.user().isAnonymous ? '🔒' : '🔓'));
}
