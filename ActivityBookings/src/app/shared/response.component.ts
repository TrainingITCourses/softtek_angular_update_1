import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'lab-response',
  standalone: true,
  imports: [JsonPipe],
  template: `
    @if (error(); as error) {
      <pre>🔥 {{ error | json }}</pre>
    } @else {
      @if (result(); as result) {
        <pre>{{ result | json }}</pre>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseComponent {
  response = input<any>();
  error = computed(() => this.response()?.error?.message);
  result = computed(() => this.response()?.result);
}
