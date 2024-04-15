import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthRepository } from '../shared/auth.repository';

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
          <li>👤 <a routerLink="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  #authRepository: AuthRepository = inject(AuthRepository);
  title: string = environment.appName;
}
