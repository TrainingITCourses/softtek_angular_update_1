import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            🏠 <a href="">{{ title }}</a>
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
  // constructor(private authService: AuthService) {}
}
