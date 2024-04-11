import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'lab-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: ` <span>{{ user() }}</span> `,
})
export class UserComponent {
  user: InputSignal<string> = input.required<string>();
}
