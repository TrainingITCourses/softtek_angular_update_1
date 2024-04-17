import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthStore } from '../shared/auth.store';

// class FakeAuthService {
//   user = 'fake!!!';
// }
// providers:[{provide: AuthService, useClass: FakeAuthService}]

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe, RouterLink],
  //providers: [{ provide: AuthService, useClass: FakeAuthService }],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            🏠 <a routerLink="/">{{ title | uppercase }}</a>
          </li>
          @if (isAnonymous()) {
            <li>👤 <a routerLink="/login">Login</a></li>
            <li>👤 <a routerLink="/register">Register</a></li>
          }
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  #authStore = inject(AuthStore);
  isAnonymous = this.#authStore.isAnonymous;
  title: string = environment.appName;
}
