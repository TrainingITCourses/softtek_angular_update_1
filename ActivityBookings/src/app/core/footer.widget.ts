import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CookiesComponent } from './cookies.component';
import { CookiesStatus, UserStatus } from './user-status.type';
import { UserComponent } from './user.component';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent, UserComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <nav>
        <span> {{ getYear() }}</span>
        <span>
          <lab-user [user]="user()" (click)="openDialog.set(true)" />
          <lab-cookies
            [(openDialog)]="openDialog"
            (accept)="onCookiesUpdate($event)"
            (cancel)="onCookiesUpdate('rejected')" />
        </span>
      </nav>
    </footer>
  `,
})
export class FooterWidget {
  #saveCookiesStatus = effect(() => {
    console.log('saving cookies status', this.cookiesStatus());
  });

  getYear() {
    return new Date().getFullYear();
  }

  userStatus: WritableSignal<UserStatus> = signal<UserStatus>({
    cookies: 'pending',
    isAnonymous: true,
    credit: 0,
  });

  openDialog: WritableSignal<boolean> = signal(true);

  user = computed(() => {
    let result = '';
    result += this.userStatus().isAnonymous ? '👤' : '🙂';
    result += this.userStatus().cookies === 'rejected' ? '🚫' : '💚';
    return result;
  });
  cookiesStatus: Signal<CookiesStatus> = computed(() => this.userStatus().cookies);
  areCookiesPending: Signal<boolean> = computed(() => this.cookiesStatus() === 'pending');

  onCookiesUpdate(newStatus: CookiesStatus) {
    this.userStatus.update((state) => {
      const newState = { ...state, cookies: newStatus };
      return newState;
    });
  }
}
