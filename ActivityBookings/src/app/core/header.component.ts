import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <nav>
      <ul>
        <li>🏠 {{ title }}</li>
        <li>👤 {{ user }}</li>
      </ul>
    </nav>
  `,
})
export class HeaderComponent {
  #authService: AuthService = inject(AuthService);
  title: string = 'Activity Bookings';
  user: string = this.#authService.user;
  // constructor(private authService: AuthService) {}
}
