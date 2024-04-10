import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  input,
  model,
  output,
} from '@angular/core';

export type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';
export type Acceptance = 'essentials' | 'all';

@Component({
  selector: 'lab-cookies',
  standalone: true,
  imports: [],
  template: `
    <span> Cookies status: {{ cookiesStatus() }}</span>
    <span>
      @if (areCookiesPending()) {
        <button (click)="onUpdate('all')">Accept cookies</button>
        <button (click)="onUpdate('rejected')">Reject cookies</button>
        <button (click)="onUpdate('all')">Accept All cookies</button>
        <button (click)="onUpdate('pending')">Remain pending cookies</button>
      }
    </span>
    <div>
      <button (click)="ttl.set(1)">1 day</button>
      <button (click)="ttl.set(365)">1 year</button>
      <p>Dumb Child {{ ttl() }}</p>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesComponent {
  cookiesStatus: InputSignal<CookiesStatus> = input.required<CookiesStatus>();
  areCookiesPending: InputSignal<boolean> = input(true);
  cancel: OutputEmitterRef<void> = output();
  accept: OutputEmitterRef<Acceptance> = output<Acceptance>();

  ttl: ModelSignal<number> = model(1);

  onUpdate(newStatus: CookiesStatus) {
    console.log('updating cookies status', newStatus);
    if (newStatus === 'all' || newStatus === 'essentials') {
      this.accept.emit(newStatus);
    } else {
      this.cancel.emit();
    }
  }
}
