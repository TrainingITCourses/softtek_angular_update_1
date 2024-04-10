import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CookiesComponent, CookiesStatus } from './cookies.component';

type UserStatus = {
  cookies: CookiesStatus;
  isAnonymous: boolean;
  credit: number;
};

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent],
  template: `
    <footer>
      <h1>Smart Parent TTL: {{ ttl() }}</h1>
      <nav>
        <span> {{ getYear() }}</span>
        <lab-cookies
          [areCookiesPending]="areCookiesPending()"
          [cookiesStatus]="cookiesStatus()"
          [(ttl)]="ttl"
          (cancel)="onUpdate('rejected')" />
      </nav>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterWidget {
  #saveCookiesStatus = effect(() => {
    console.log('saving cookies status', this.cookiesStatus());
    console.log('saving ttl', this.ttl());
    // localStorage.setItem('Cookies', JSON.stringify(this.cookiesStatus()));
  });

  getYear() {
    return new Date().getFullYear();
  }

  userStatus: WritableSignal<UserStatus> = signal<UserStatus>({
    cookies: 'pending',
    isAnonymous: true,
    credit: 0,
  });

  ttl: WritableSignal<number> = signal(42);

  cookiesStatus: Signal<CookiesStatus> = computed(() => this.userStatus().cookies);
  areCookiesPending: Signal<boolean> = computed(() => this.cookiesStatus() === 'pending');

  onUpdate(newStatus: CookiesStatus) {
    this.userStatus.update((x) => {
      const y = { ...x, cookies: newStatus };
      return y;
    });
  }
}
