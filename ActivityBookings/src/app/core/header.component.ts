import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';

// class FakeAuthService {
//   user = 'fake';
// }
// providers:[{provide: AuthService, useClass: FakeAuthService}]

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe],
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
  title: string = 'Activity Bookings';
  user: string = this.#authService.user;
}
