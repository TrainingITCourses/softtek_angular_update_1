import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';

// class FakeAuthService {
//   user = 'fake!!!';
// }
// providers:[{provide: AuthService, useClass: FakeAuthService}]

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe],
  //providers: [{ provide: AuthService, useClass: FakeAuthService }],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            🏠 <a href="">{{ title | uppercase }}</a>
          </li>
          <li>
            👤 <a href="">{{ user }}</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  #authService: AuthService = inject(AuthService);
  title: string = environment.appName;
  user: string = this.#authService.user;
}
